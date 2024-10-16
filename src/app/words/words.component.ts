import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { EnvService } from '@myrmidon/ng-tools';

import { AttributeInfo, Lemma, Word } from '@myrmidon/pythia-api';
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

  constructor(private _router: Router, env: EnvService) {
    this.attributes = env.get('indexDocAttrs') as AttributeInfo[] | undefined;
  }

  public onSearchRequest(token: Word | Lemma): void {
    this._router.navigate(['search', token.value]);
  }
}
