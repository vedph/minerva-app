import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { EnvService } from '@myrmidon/ngx-tools';

import {
  AttributeInfo,
  Lemma,
  Word,
  WordSortOrder,
} from '@myrmidon/pythia-api';
import { WordIndexComponent } from '@myrmidon/pythia-word-index';

@Component({
  selector: 'app-words',
  imports: [MatCardModule, MatIconModule, WordIndexComponent],
  templateUrl: './words.component.html',
  styleUrl: './words.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsComponent {
  public readonly attributes = signal<AttributeInfo[] | undefined>(undefined);
  public readonly sortOrderEntries = signal<any>([
    // ascending
    { key: $localize`▲ value`, value: WordSortOrder.ByValue },
    { key: $localize`▲ reversed value`, value: WordSortOrder.ByReversedValue },
    { key: $localize`▲ frequency`, value: WordSortOrder.ByCount },
    // descending
    { key: $localize`▼ value`, value: WordSortOrder.ByValue, descending: true },
    {
      key: $localize`▼ reversed value`,
      value: WordSortOrder.ByReversedValue,
      descending: true,
    },
    {
      key: $localize`▼ frequency`,
      value: WordSortOrder.ByCount,
      descending: true,
    },
  ]);

  constructor(
    private _router: Router,
    env: EnvService,
  ) {
    this.attributes.set(
      env.get('indexDocAttrs') as AttributeInfo[] | undefined,
    );
  }

  public onSearchRequest(span: Word | Lemma): void {
    // pass the span to the search page
    // the argument is a string of the form "<value>#<L|W><id>"
    // where:
    // - value is the word or lemma value
    // - L or W indicates whether it is a lemma or word
    // - id is the word or lemma id
    if (span.type === 'lemma') {
      this._router.navigate(['search', `${span.value}#L${span.id}`]);
    } else {
      this._router.navigate(['search', `${span.value}#W${span.id}`]);
    }
  }
}
