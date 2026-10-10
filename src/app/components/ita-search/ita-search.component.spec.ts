import { Component, input } from '@angular/core';
import { render, screen, waitFor, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BehaviorSubject } from 'rxjs';

import { DataPage } from '@myrmidon/ngx-tools';
import { KwicSearchResult } from '@myrmidon/pythia-api';
import { DocumentReadRequest } from '@myrmidon/pythia-core';
import { DocumentReaderComponent } from '@myrmidon/pythia-document-reader';
import {
  SearchExportComponent,
  SearchRepository,
} from '@myrmidon/pythia-search';

import { provideFakeEnv } from '../../../testing/fake-env';
import { SPEECH_RECOGNITION_LANG } from '../../services/speech-recognition.service';
import { ItaSearchComponent } from './ita-search.component';

// stands in for the real document reader, exposing the request it receives
@Component({
  selector: 'pythia-document-reader',
  template: `<output aria-label="read request">{{ json() }}</output>`,
})
class DocumentReaderStubComponent {
  public readonly request = input<DocumentReadRequest>();

  public json(): string {
    return this.request() ? JSON.stringify(this.request()) : '';
  }
}

// stands in for the real export button, exposing the inputs it receives
@Component({
  selector: 'pythia-search-export',
  template: `<button type="button" [disabled]="disabled()">
    export {{ query() }}
  </button>`,
})
class SearchExportStubComponent {
  public readonly query = input<string | null>();
  public readonly disabled = input<boolean>();
}

/**
 * In-memory replacement for the search repository, whose state is driven
 * by the tests rather than by the backend.
 */
class FakeSearchRepository {
  public readonly page$ = new BehaviorSubject<
    DataPage<KwicSearchResult> | undefined
  >(undefined);
  public readonly query$ = new BehaviorSubject<string | undefined>(undefined);
  public readonly lastQueries$ = new BehaviorSubject<string[]>([]);
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public readonly error$ = new BehaviorSubject<string | undefined>(undefined);
  public readonly readRequest$ = new BehaviorSubject<
    DocumentReadRequest | undefined
  >(undefined);

  public readonly addToHistory = vi.fn();
  public readonly setFilter = vi.fn();
  public readonly setPage = vi.fn();
  public readonly clear = vi.fn();
  public readonly setReadRequest = vi.fn();
}

function kwic(n: number): KwicSearchResult {
  return {
    documentId: 100 + n,
    index: 10 * n,
    length: 4,
    author: `author${n}`,
    title: `title${n}`,
    value: `value${n}`,
    text: `text${n}`,
    leftContext: ['l5', 'l4', 'l3', 'l2', `left${n}`],
    rightContext: [`right${n}`, 'r2', 'r3', 'r4', 'r5'],
  } as KwicSearchResult;
}

function page(
  count: number,
  total = count,
  pageNumber = 1,
): DataPage<KwicSearchResult> {
  return {
    pageNumber,
    pageSize: 20,
    pageCount: Math.ceil(total / 20),
    total,
    items: Array.from({ length: count }, (_, i) => kwic(i + 1)),
  };
}

interface SetupOptions {
  initialQueryTerm?: string;
  hideAuthor?: boolean;
  hideTitle?: boolean;
  readonlyQuery?: boolean;
  query?: string;
  page?: DataPage<KwicSearchResult>;
}

async function setup(options: SetupOptions = {}) {
  const repository = new FakeSearchRepository();
  repository.query$.next(options.query);
  repository.page$.next(options.page);

  const view = await render(ItaSearchComponent, {
    inputs: {
      initialQueryTerm: options.initialQueryTerm,
      hideAuthor: options.hideAuthor,
      hideTitle: options.hideTitle,
      readonlyQuery: options.readonlyQuery,
    },
    providers: [
      { provide: SearchRepository, useValue: repository },
      { provide: SPEECH_RECOGNITION_LANG, useValue: 'it-IT' },
      provideFakeEnv(),
    ],
    configureTestBed: (testBed) =>
      testBed.overrideComponent(ItaSearchComponent, {
        remove: { imports: [DocumentReaderComponent, SearchExportComponent] },
        add: {
          imports: [DocumentReaderStubComponent, SearchExportStubComponent],
        },
      }),
  });
  return { ...view, user: userEvent.setup(), repository };
}

type User = ReturnType<typeof userEvent.setup>;

const button = (name: string | RegExp) => screen.getByRole('button', { name });
const queryBox = () =>
  screen.findByRole<HTMLTextAreaElement>('textbox', { name: 'query' });

async function openAdvancedTab(user: User): Promise<HTMLTextAreaElement> {
  await user.click(screen.getByRole('tab', { name: /advanced/ }));
  return queryBox();
}

function headers(): string[] {
  return screen
    .getAllByRole('columnheader')
    .map((th) => th.textContent?.trim() ?? '');
}

function cells(rowIndex: number): string[] {
  const row = screen.getAllByRole('row')[rowIndex + 1];
  return within(row)
    .getAllByRole('cell')
    .map((td) => td.textContent?.trim() ?? '');
}

describe('ItaSearchComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('simple query', () => {
    it('should show the simple query tab first', async () => {
      await setup();

      expect(screen.getByRole('tab', { name: /simple/ })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByPlaceholderText('text')).toBeInTheDocument();
    });

    it('should search for the query converted from the text', async () => {
      const { user, repository } = await setup();

      await user.type(
        screen.getByPlaceholderText('text'),
        'trova il lemma "andare"',
      );
      await user.click(button('convert'));
      await user.click(button('search'));

      expect(repository.addToHistory).toHaveBeenCalledWith('[lemma="andare"]');
      expect(repository.setFilter).toHaveBeenCalledWith({
        query: '[lemma="andare"]',
      });
    });

    it('should copy the converted query into the advanced query', async () => {
      const { user } = await setup();
      await user.type(screen.getByPlaceholderText('text'), 'cane');
      await user.click(button('convert'));
      await user.click(button('search'));

      const query = await openAdvancedTab(user);

      expect(query).toHaveValue('[value="cane"]');
    });

    it('should let the user edit the converted query by default', async () => {
      await setup();

      expect(screen.getByPlaceholderText('query')).not.toHaveAttribute(
        'readonly',
      );
    });

    it('should make the converted query readonly when requested', async () => {
      await setup({ readonlyQuery: true });

      expect(screen.getByPlaceholderText('query')).toHaveAttribute('readonly');
    });
  });

  describe('advanced query', () => {
    it('should not let the user search with no query', async () => {
      const { user } = await setup();

      await openAdvancedTab(user);

      expect(button('search')).toBeDisabled();
    });

    it('should search for the typed query from the search button', async () => {
      const { user, repository } = await setup();
      const query = await openAdvancedTab(user);

      await user.type(query, '[[value="cane"]');
      await user.click(button('search'));

      expect(repository.addToHistory).toHaveBeenCalledWith('[value="cane"]');
      expect(repository.setFilter).toHaveBeenCalledTimes(1);
      expect(repository.setFilter).toHaveBeenCalledWith({
        query: '[value="cane"]',
      });
    });

    it('should search with Ctrl+Enter', async () => {
      const { user, repository } = await setup();
      const query = await openAdvancedTab(user);

      await user.type(query, '[[value="cane"]');
      await user.keyboard('{Control>}{Enter}{/Control}');

      expect(repository.setFilter).toHaveBeenCalledTimes(1);
      expect(repository.setFilter).toHaveBeenCalledWith({
        query: '[value="cane"]',
      });
    });

    it('should trim the query', async () => {
      const { user, repository } = await setup();
      const query = await openAdvancedTab(user);

      await user.type(query, '  [[value="cane"]  ');
      await user.click(button('search'));

      expect(repository.setFilter).toHaveBeenCalledWith({
        query: '[value="cane"]',
      });
    });

    it('should not search for a blank query', async () => {
      const { user, repository } = await setup();
      const query = await openAdvancedTab(user);

      await user.type(query, '   ');
      await user.click(button('search'));

      expect(repository.setFilter).not.toHaveBeenCalled();
      expect(repository.addToHistory).not.toHaveBeenCalled();
    });

    it('should require a query', async () => {
      const { user } = await setup();
      const query = await openAdvancedTab(user);

      await user.type(query, 'x');
      await user.clear(query);
      await user.tab();

      expect(await screen.findByText('query required')).toBeInTheDocument();
    });

    it('should not let the user enter a query which is too long', async () => {
      const { user } = await setup();
      const query = await openAdvancedTab(user);

      await user.click(query);
      await user.paste('x'.repeat(1001));

      expect(query).toHaveValue('x'.repeat(1000));
    });

    it('should reject a query which is too long', async () => {
      const { user, repository } = await setup({
        initialQueryTerm: 'x'.repeat(1001),
      });
      const query = await openAdvancedTab(user);

      await user.click(query);
      await user.keyboard('{Control>}{Enter}{/Control}');
      await user.tab();

      expect(await screen.findByText('query too long')).toBeInTheDocument();
      expect(button('search')).toBeDisabled();
      expect(repository.setFilter).not.toHaveBeenCalled();
    });

    it('should not search with Enter alone', async () => {
      const { user, repository } = await setup();
      const query = await openAdvancedTab(user);

      await user.type(query, '[[value="cane"]{Enter}');

      expect(repository.setFilter).not.toHaveBeenCalled();
    });

    it('should render no form element', async () => {
      const { user, container } = await setup();
      await openAdvancedTab(user);

      expect(container.querySelector('form')).toBeNull();
    });

    it('should not let the user search while loading', async () => {
      const { user, repository } = await setup();
      const query = await openAdvancedTab(user);
      await user.type(query, 'cane');

      repository.loading$.next(true);

      await waitFor(() => expect(button('search')).toBeDisabled());
    });

    describe('history', () => {
      const history = () => screen.findByRole('combobox', { name: 'history' });

      it('should set the query picked from the last queries', async () => {
        const { user, repository } = await setup();
        repository.lastQueries$.next(['[value="a"]', '[value="b"]']);
        const query = await openAdvancedTab(user);

        await user.click(await history());
        await user.click(
          await screen.findByRole('option', { name: '[value="b"]' }),
        );
        await user.click(button('Pick the selected query'));

        expect(query).toHaveValue('[value="b"]');
        await waitFor(() => expect(query).toHaveFocus());
        expect(repository.setFilter).not.toHaveBeenCalled();
      });

      it('should leave the query as it is when picking with no selection', async () => {
        const { user, repository } = await setup();
        repository.lastQueries$.next(['[value="a"]']);
        const query = await openAdvancedTab(user);
        await user.type(query, 'cane');

        await user.click(button('Pick the selected query'));

        expect(query).toHaveValue('cane');
      });
    });
  });

  describe('initial query term', () => {
    it('should not search when there is none', async () => {
      const { repository } = await setup();

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(repository.setFilter).not.toHaveBeenCalled();
    });

    it('should search for a value', async () => {
      const { user, repository } = await setup({ initialQueryTerm: 'cane' });

      await waitFor(() =>
        expect(repository.setFilter).toHaveBeenCalledWith({
          query: '[value="cane"]',
        }),
      );
      expect(repository.addToHistory).toHaveBeenCalledWith('[value="cane"]');
      expect(await openAdvancedTab(user)).toHaveValue('[value="cane"]');
    });

    it('should search for a lemma by its ID', async () => {
      const { repository } = await setup({ initialQueryTerm: 'andare#L7' });

      await waitFor(() =>
        expect(repository.setFilter).toHaveBeenCalledWith({
          query: '[lemma_id="7"]',
        }),
      );
    });

    it('should search for a word by its ID', async () => {
      const { repository } = await setup({ initialQueryTerm: 'vado#W42' });

      await waitFor(() =>
        expect(repository.setFilter).toHaveBeenCalledWith({
          query: '[word_id="42"]',
        }),
      );
    });

    it('should search for the value when it has no valid ID', async () => {
      const { repository } = await setup({ initialQueryTerm: 'vado#X42' });

      await waitFor(() =>
        expect(repository.setFilter).toHaveBeenCalledWith({
          query: '[value="vado#X42"]',
        }),
      );
    });
  });

  describe('progress and errors', () => {
    it('should show no progress when idle', async () => {
      await setup();

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('should show progress while loading', async () => {
      const { repository } = await setup();

      repository.loading$.next(true);

      expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    });

    it('should show the search error', async () => {
      const { repository } = await setup();

      repository.error$.next('Syntax error in query');

      expect(
        await screen.findByText('Syntax error in query'),
      ).toBeInTheDocument();
    });
  });

  describe('results', () => {
    it('should show no results before searching', async () => {
      await setup();

      expect(screen.queryByRole('table')).not.toBeInTheDocument();
      expect(screen.queryByText('(no results)')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /export/ }),
      ).not.toBeInTheDocument();
    });

    it('should tell when a query has no results', async () => {
      await setup({ query: '[value="x"]', page: page(0) });

      expect(screen.getByText('(no results)')).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('should not tell there are no results when there is no query', async () => {
      await setup({ page: page(0) });

      expect(screen.queryByText('(no results)')).not.toBeInTheDocument();
    });

    it('should show a column per context token around the value', async () => {
      await setup({ query: 'q', page: page(2) });

      expect(headers()).toEqual([
        '',
        '',
        'author',
        'title',
        '5',
        '4',
        '3',
        '2',
        '1',
        'value',
        '1',
        '2',
        '3',
        '4',
        '5',
      ]);
    });

    it('should show a row per result', async () => {
      await setup({ query: 'q', page: page(2) });

      expect(screen.getAllByRole('row')).toHaveLength(3);
      // the second cell holds the read buttons
      const row = cells(1);
      expect(row[0]).toBe('2.');
      expect(row.slice(2)).toEqual([
        'author2',
        'title2',
        'l5',
        'l4',
        'l3',
        'l2',
        'left2',
        'text2',
        'right2',
        'r2',
        'r3',
        'r4',
        'r5',
      ]);
    });

    it('should hide the author when requested', async () => {
      await setup({ query: 'q', page: page(1), hideAuthor: true });

      expect(headers()).not.toContain('author');
      expect(headers()).toContain('title');
      expect(cells(0)).not.toContain('author1');
      expect(cells(0)).toContain('title1');
    });

    it('should hide the title when requested', async () => {
      await setup({ query: 'q', page: page(1), hideTitle: true });

      expect(headers()).toContain('author');
      expect(headers()).not.toContain('title');
      expect(cells(0)).toContain('author1');
      expect(cells(0)).not.toContain('title1');
    });

    it('should show the total count of results', async () => {
      await setup({ query: 'q', page: page(20, 1234) });

      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('should hide the total count while loading', async () => {
      const { repository } = await setup({ query: 'q', page: page(20, 1234) });

      repository.loading$.next(true);

      await waitFor(() =>
        expect(screen.queryByText('1234')).not.toBeInTheDocument(),
      );
    });

    it('should not let the user read documents while loading', async () => {
      const { repository } = await setup({ query: 'q', page: page(1) });

      repository.loading$.next(true);

      await waitFor(() => expect(button('Read in context')).toBeDisabled());
      expect(button('Read document')).toBeDisabled();
    });

    it('should collapse the query when there are results', async () => {
      await setup({ query: 'q', page: page(2) });

      expect(button('query')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should expand the query when there are no results', async () => {
      const { repository } = await setup({ query: 'q', page: page(2) });

      repository.page$.next(page(0));

      await waitFor(() =>
        expect(button('query')).toHaveAttribute('aria-expanded', 'true'),
      );
    });

    it('should let the user expand the collapsed query', async () => {
      const { user } = await setup({ query: 'q', page: page(2) });

      await user.click(button('query'));

      expect(button('query')).toHaveAttribute('aria-expanded', 'true');
    });

    it('should move to the page picked in the paginator', async () => {
      const { user, repository } = await setup({
        query: 'q',
        page: page(20, 45),
      });

      await user.click(button('Next page'));

      expect(repository.setPage).toHaveBeenCalledWith(2, 20);
    });

    it('should show the current page in the paginator', async () => {
      await setup({ query: 'q', page: page(5, 45, 3) });

      expect(button('Next page')).toHaveAttribute('aria-disabled', 'true');
      expect(button('Previous page')).not.toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  });

  describe('results toolbar', () => {
    it('should offer to export the results of the query', async () => {
      await setup({ query: '[value="cane"]', page: page(2) });

      expect(button('export [value="cane"]')).toBeEnabled();
    });

    it('should clear the results', async () => {
      const { user, repository } = await setup({ query: 'q', page: page(2) });

      // the simple query has a clear button too, preceding the results one
      const clear = screen.getAllByRole('button', { name: 'clear' }).at(-1)!;
      await user.click(clear);

      expect(repository.clear).toHaveBeenCalledTimes(1);
    });

    it('should disable export and clear when there are no results', async () => {
      const { user } = await setup({ query: 'q', page: page(0) });
      // leave the simple tab, which has a clear button too
      await openAdvancedTab(user);

      expect(button('export q')).toBeDisabled();
      expect(button('clear')).toBeDisabled();
    });
  });

  describe('document reader', () => {
    it('should initially request no document', async () => {
      await setup();

      expect(screen.getByLabelText('read request').textContent).toBe('');
    });

    it('should request the context of a result from its read in context button', async () => {
      const { user, repository } = await setup({ query: 'q', page: page(2) });

      await user.click(
        screen.getAllByRole('button', { name: 'Read in context' })[1],
      );

      expect(repository.setReadRequest).toHaveBeenCalledWith({
        documentId: 102,
        start: 20,
        end: 24,
      });
    });

    it('should request the context of a result from its value', async () => {
      const { user, repository } = await setup({ query: 'q', page: page(2) });

      await user.click(screen.getByRole('cell', { name: 'text1' }));

      expect(repository.setReadRequest).toHaveBeenCalledWith({
        documentId: 101,
        start: 10,
        end: 14,
      });
    });

    it('should request the whole document of a result from its read document button', async () => {
      const { user, repository } = await setup({ query: 'q', page: page(2) });

      await user.click(
        screen.getAllByRole('button', { name: 'Read document' })[0],
      );

      expect(repository.setReadRequest).toHaveBeenCalledWith({
        documentId: 101,
      });
    });

    it('should pass the read request to the reader', async () => {
      const { repository } = await setup();

      repository.readRequest$.next({ documentId: 7, start: 1, end: 5 });

      await waitFor(() =>
        expect(screen.getByLabelText('read request')).toHaveTextContent(
          '{"documentId":7,"start":1,"end":5}',
        ),
      );
    });
  });
});
