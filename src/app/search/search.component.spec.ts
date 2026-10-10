import { Component, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { render, screen } from '@testing-library/angular';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SearchComponent } from './search.component';

// stands in for the real search UI, exposing the inputs it receives
@Component({
  selector: 'minerva-ita-search',
  template: `
    <output aria-label="initial term">{{ initialQueryTerm() }}</output>
    <output aria-label="readonly query">{{ readonlyQuery() }}</output>
    <output aria-label="hide author">{{ hideAuthor() }}</output>
    <output aria-label="hide title">{{ hideTitle() }}</output>
  `,
})
class ItaSearchStubComponent {
  public readonly initialQueryTerm = input<string>();
  public readonly readonlyQuery = input<boolean>();
  public readonly hideAuthor = input<boolean>();
  public readonly hideTitle = input<boolean>();
}

function setup(params: Record<string, string>) {
  return render(SearchComponent, {
    componentImports: [MatCardModule, MatIconModule, ItaSearchStubComponent],
    providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { params } } },
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
