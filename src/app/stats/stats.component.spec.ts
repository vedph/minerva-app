import { render, screen, waitFor, within } from '@testing-library/angular';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { Observable, of, Subject } from 'rxjs';

import { StatsService } from '@myrmidon/pythia-api';

import { provideFakeEnv } from '../../testing/fake-env';
import { StatsComponent } from './stats.component';

type Stats = { [key: string]: number };

const STATS: Stats = {
  document_count: 340,
  document_attribute_count_ratio: 12.3456,
  span_count: 1234567,
  span_attribute_count_ratio: 3.1,
  word_count: 45678,
  lemma_count: 23456,
  'span.tok': 1000000,
  'span.snt': 50000,
  'span.p': 20000,
  'span.fp-lat': 300,
  'span.custom': 7,
  '@giudicante': 340,
  '@pos': 900000,
};

interface PieOptions {
  legend: { data: string[] };
  series: { name: string; type: string; data: { name: string; value: number }[] }[];
}

async function setup(stats$: Observable<Stats> = of(STATS)) {
  // the chart engine needs a real canvas, so replace it and capture
  // the options it receives
  const chart = {
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
    isDisposed: () => false,
    on: vi.fn(),
    off: vi.fn(),
  };
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.spyOn(console, 'log').mockImplementation(() => {});

  const view = await render(StatsComponent, {
    providers: [
      { provide: StatsService, useValue: { getStatistics: () => stats$ } },
      {
        provide: NGX_ECHARTS_CONFIG,
        useValue: { echarts: { init: () => chart } },
      },
      provideFakeEnv({ apiUrl: 'http://localhost/api/' }),
    ],
  });
  return { ...view, chart };
}

function tableValues(): Record<string, string> {
  const values: Record<string, string> = {};
  for (const row of within(screen.getByRole('table')).getAllByRole('row')) {
    const [label, value] = within(row)
      .getAllByRole('cell')
      .map((cell) => cell.textContent?.trim() ?? '');
    values[label] = value;
  }
  return values;
}

describe('StatsComponent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should show the page title', async () => {
    await setup();

    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });

  it('should show nothing but the title until statistics are loaded', async () => {
    const { chart } = await setup(new Subject<Stats>());

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(chart.setOption).not.toHaveBeenCalled();
  });

  it('should show the formatted counts', async () => {
    await setup();

    expect(tableValues()).toEqual({
      documents: '340',
      'document metadata density': '12.35',
      spans: '1,234,567',
      'span metadata density': '3.10',
      words: '45,678',
      lemmata: '23,456',
    });
  });

  it('should show the statistics once they are loaded', async () => {
    const stats$ = new Subject<Stats>();
    await setup(stats$);

    stats$.next(STATS);

    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(tableValues()['documents']).toBe('340');
  });

  it('should chart the spans in a pie with readable names', async () => {
    const { chart } = await setup();

    await waitFor(() => expect(chart.setOption).toHaveBeenCalled());
    const options = chart.setOption.mock.calls[0][0] as PieOptions;

    expect(options.series).toHaveLength(1);
    expect(options.series[0].type).toBe('pie');
    expect(options.series[0].name).toBe('Spans');
    expect(options.series[0].data).toEqual([
      { name: 'tokens', value: 1000000 },
      { name: 'sentences', value: 50000 },
      { name: 'paragraphs', value: 20000 },
      { name: 'latin phrases', value: 300 },
      { name: 'span.custom', value: 7 },
    ]);
  });

  it('should list each charted span in the legend', async () => {
    const { chart } = await setup();

    await waitFor(() => expect(chart.setOption).toHaveBeenCalled());
    const options = chart.setOption.mock.calls[0][0] as PieOptions;

    expect(options.legend.data).toEqual([
      'tokens',
      'sentences',
      'paragraphs',
      'latin phrases',
      'span.custom',
    ]);
  });

  it('should show the attributes in a cloud with readable names', async () => {
    await setup();

    // a known attribute is renamed, an unknown one keeps its name
    expect(await screen.findByText('organo giudicante')).toBeInTheDocument();
    expect(screen.getByText('@pos')).toBeInTheDocument();
  });

  it('should not show counts or spans in the cloud', async () => {
    await setup();
    await screen.findByText('organo giudicante');

    expect(screen.queryByText('document_count')).not.toBeInTheDocument();
    expect(screen.queryByText('span.tok')).not.toBeInTheDocument();
    expect(screen.queryByText('tokens')).not.toBeInTheDocument();
  });
});
