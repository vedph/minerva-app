import { Component, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { render, screen } from '@testing-library/angular';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { provideFakeEnv } from '../../testing/fake-env';
import { isMapHidden, SearchComponent } from './search.component';

// stands in for the real search UI, exposing the inputs it receives
@Component({
  selector: 'minerva-ita-search',
  template: `
    <output aria-label="initial term">{{ initialQueryTerm() }}</output>
    <output aria-label="readonly query">{{ readonlyQuery() }}</output>
    <output aria-label="hide author">{{ hideAuthor() }}</output>
    <output aria-label="hide title">{{ hideTitle() }}</output>
    <output aria-label="hide map">{{ hideMap() }}</output>
  `,
})
class ItaSearchStubComponent {
  public readonly initialQueryTerm = input<string>();
  public readonly readonlyQuery = input<boolean>();
  public readonly hideAuthor = input<boolean>();
  public readonly hideTitle = input<boolean>();
  public readonly hideMap = input<boolean>();
}

function setup(
  params: Record<string, string>,
  env: Record<string, unknown> = {},
) {
  return render(SearchComponent, {
    componentImports: [MatCardModule, MatIconModule, ItaSearchStubComponent],
    providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { params } } },
      provideFakeEnv(env),
    ],
  });
}

describe('SearchComponent', () => {
  it('should show the page title', async () => {
    await setup({});

    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should pass the term from the route to the search', async () => {
    await setup({ term: 'cane#L12' });

    expect(screen.getByLabelText('initial term')).toHaveTextContent('cane#L12');
  });

  it('should pass no term when the route has none', async () => {
    await setup({});

    expect(screen.getByLabelText('initial term').textContent).toBe('');
  });

  it('should configure the search as readonly without author and title', async () => {
    await setup({});

    expect(screen.getByLabelText('readonly query')).toHaveTextContent('true');
    expect(screen.getByLabelText('hide author')).toHaveTextContent('true');
    expect(screen.getByLabelText('hide title')).toHaveTextContent('true');
  });
});

describe('SearchComponent hideMap', () => {
  it('should hide the map when env has no hideMap', async () => {
    await setup({});

    expect(screen.getByLabelText('hide map')).toHaveTextContent('true');
  });

  it('should hide the map when env hideMap is "true"', async () => {
    await setup({}, { hideMap: 'true' });

    expect(screen.getByLabelText('hide map')).toHaveTextContent('true');
  });

  it('should show the map when env hideMap is "false"', async () => {
    await setup({}, { hideMap: 'false' });

    expect(screen.getByLabelText('hide map')).toHaveTextContent('false');
  });
});

describe('isMapHidden', () => {
  it('should hide unless explicitly false', () => {
    expect(isMapHidden(undefined)).toBe(true);
    expect(isMapHidden('')).toBe(true);
    expect(isMapHidden('true')).toBe(true);
    expect(isMapHidden(true)).toBe(true);
    expect(isMapHidden('false')).toBe(false);
    expect(isMapHidden('FALSE')).toBe(false);
    expect(isMapHidden(false)).toBe(false);
  });
});
