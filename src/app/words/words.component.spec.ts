import { Component, input, output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import {
  AttributeInfo,
  Lemma,
  Word,
  WordSortOrder,
} from '@myrmidon/pythia-api';

import { provideFakeEnv } from '../../testing/fake-env';
import { WordsComponent } from './words.component';

const LEMMA: Lemma = {
  type: 'lemma',
  id: 7,
  value: 'andare',
  reversedValue: 'eradna',
  count: 10,
};
const WORD: Word = {
  type: 'word',
  id: 42,
  value: 'vado',
  reversedValue: 'odav',
  count: 3,
};

// stands in for the real word index, exposing the inputs it receives
// and letting the user request a search
@Component({
  selector: 'pythia-word-index',
  template: `
    <output aria-label="hide language">{{ hideLanguage() }}</output>
    <output aria-label="hide filter">{{ hideFilter() }}</output>
    <output aria-label="hide loc">{{ hideLoc() }}</output>
    <ul aria-label="sort orders">
      @for (e of sortOrderEntries(); track $index) {
        <li>{{ e.key }}|{{ e.value }}|{{ !!e.descending }}</li>
      }
    </ul>
    <ul aria-label="attributes">
      @for (a of attributes(); track a.name) {
        <li>{{ a.name }}</li>
      }
    </ul>
    <button type="button" (click)="searchRequest.emit(lemma)">lemma</button>
    <button type="button" (click)="searchRequest.emit(word)">word</button>
  `,
})
class WordIndexStubComponent {
  public readonly hideLanguage = input<boolean>();
  public readonly hideFilter = input<boolean>();
  public readonly hideLoc = input<boolean>();
  public readonly sortOrderEntries =
    input<{ key: string; value: number; descending?: boolean }[]>();
  public readonly attributes = input<AttributeInfo[]>();
  public readonly searchRequest = output<Lemma | Word>();

  public readonly lemma = LEMMA;
  public readonly word = WORD;
}

async function setup(env: Record<string, unknown> = {}) {
  const view = await render(WordsComponent, {
    componentImports: [MatCardModule, MatIconModule, WordIndexStubComponent],
    providers: [provideFakeEnv(env)],
  });
  const navigate = vi
    .spyOn(TestBed.inject(Router), 'navigate')
    .mockResolvedValue(true);
  return { ...view, user: userEvent.setup(), navigate };
}

function items(listName: string): (string | undefined)[] {
  const list = screen.getByRole('list', { name: listName });
  return Array.from(list.children).map((li) => li.textContent?.trim());
}

describe('WordsComponent', () => {
  it('should show the page title', async () => {
    await setup();

    expect(screen.getByText('Index')).toBeInTheDocument();
  });

  it('should hide language, filter and location in the index', async () => {
    await setup();

    expect(screen.getByLabelText('hide language')).toHaveTextContent('true');
    expect(screen.getByLabelText('hide filter')).toHaveTextContent('true');
    expect(screen.getByLabelText('hide loc')).toHaveTextContent('true');
  });

  it('should offer ascending and descending sort orders', async () => {
    await setup();

    const { ByValue, ByReversedValue, ByCount } = WordSortOrder;
    expect(items('sort orders')).toEqual([
      `▲ value|${ByValue}|false`,
      `▲ reversed value|${ByReversedValue}|false`,
      `▲ frequency|${ByCount}|false`,
      `▼ value|${ByValue}|true`,
      `▼ reversed value|${ByReversedValue}|true`,
      `▼ frequency|${ByCount}|true`,
    ]);
  });

  it('should pass the document attributes from the environment', async () => {
    await setup({
      indexDocAttrs: [
        { name: 'data', type: 0 },
        { name: 'materia', type: 0 },
      ],
    });

    expect(items('attributes')).toEqual(['data', 'materia']);
  });

  it('should pass no attributes when the environment has none', async () => {
    await setup();

    expect(items('attributes')).toEqual([]);
  });

  it('should navigate to the search page for a lemma', async () => {
    const { user, navigate } = await setup();

    await user.click(screen.getByRole('button', { name: 'lemma' }));

    expect(navigate).toHaveBeenCalledWith(['search', 'andare#L7']);
  });

  it('should navigate to the search page for a word', async () => {
    const { user, navigate } = await setup();

    await user.click(screen.getByRole('button', { name: 'word' }));

    expect(navigate).toHaveBeenCalledWith(['search', 'vado#W42']);
  });
});
