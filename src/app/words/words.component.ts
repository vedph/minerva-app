import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { EnvService } from '@myrmidon/ng-tools';

import {
  AttributeInfo,
  Lemma,
  Word,
  WordSortOrder,
} from '@myrmidon/pythia-api';
import { WordIndexComponent } from '@myrmidon/pythia-word-index';

@Component({
  selector: 'app-words',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    WordIndexComponent,
  ],
  templateUrl: './words.component.html',
  styleUrl: './words.component.scss',
})
export class WordsComponent {
  public attributes?: AttributeInfo[];
  public sortOrderEntries = [
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
  ];

  constructor(private _router: Router, env: EnvService) {
    this.attributes = env.get('indexDocAttrs') as AttributeInfo[] | undefined;
  }

  public onSearchRequest(token: Word | Lemma): void {
    if (token.type === 'lemma') {
      this._router.navigate(['search', '^' + token.value]);
    } else {
      this._router.navigate(['search', token.value]);
    }
  }
}
