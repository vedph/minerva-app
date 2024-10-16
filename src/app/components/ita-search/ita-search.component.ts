import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DataPage } from '@myrmidon/ng-tools';

import { DocumentReadRequest } from '@myrmidon/pythia-core';
import { KwicSearchResult } from '@myrmidon/pythia-api';
import { PythiaDocumentReaderModule } from '@myrmidon/pythia-document-reader';
import { PythiaSearchModule, SearchRepository } from '@myrmidon/pythia-search';
import { PythiaQueryBuilderModule } from '@myrmidon/pythia-query-builder';

import { PqitaComponent } from '../pqita/pqita.component';

@Component({
  selector: 'minerva-ita-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    PythiaQueryBuilderModule,
    PythiaSearchModule,
    PythiaDocumentReaderModule,
    PqitaComponent,
  ],
  templateUrl: './ita-search.component.html',
  styleUrl: './ita-search.component.scss',
})
export class ItaSearchComponent implements OnInit, OnDestroy {
  private readonly _subs: Subscription[] = [];

  @ViewChild('queryCtl') queryElementRef: ElementRef | undefined;

  @Input()
  public initialQueryTerm: string | undefined;

  @Input()
  public hideAuthor?: boolean;
  @Input()
  public hideTitle?: boolean;

  public query$: Observable<string | undefined>;
  public lastQueries$: Observable<string[]>;
  public loading$: Observable<boolean | undefined>;
  public page$: Observable<DataPage<KwicSearchResult> | undefined>;
  public error$: Observable<string | undefined>;
  public readRequest$: Observable<DocumentReadRequest | undefined>;

  public query: FormControl<string | null>;
  public history: FormControl<string | null>;
  public form: FormGroup;

  public leftContextLabels: string[];
  public rightContextLabels: string[];
  public queryTabIndex: number;
  public queryExpanded: boolean = true;

  constructor(private _repository: SearchRepository, formBuilder: FormBuilder) {
    this.query = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(1000),
    ]);
    this.history = formBuilder.control(null);
    this.form = formBuilder.group({
      query: this.query,
      history: this.history,
    });
    this.leftContextLabels = ['5', '4', '3', '2', '1'];
    this.rightContextLabels = ['1', '2', '3', '4', '5'];
    this.queryTabIndex = 0;

    this.page$ = _repository.page$;
    this.query$ = _repository.query$;
    this.lastQueries$ = _repository.lastQueries$;
    this.loading$ = _repository.loading$;
    this.error$ = _repository.error$;
    this.readRequest$ = _repository.readRequest$;
  }

  public ngOnInit(): void {
    if (this.initialQueryTerm) {
      this.query.setValue('[value="' + this.initialQueryTerm + '"]');
      setTimeout(() => this.search(), 0);
    }

    // when page$ changes, set queryExpanded to false if page has any items
    this._subs.push(
      this._repository.page$.subscribe((page) => {
        this.queryExpanded = !page?.items.length || !page.items.length;
      })
    );
  }

  public ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }

  public pageChange(event: PageEvent): void {
    this._repository.loadPage(event.pageIndex + 1, event.pageSize, {
      query: this.query.value!,
    });
  }

  public pickHistory(): void {
    if (!this.history.value) {
      return;
    }
    this.query.setValue(this.history.value);
    setTimeout(this.queryElementRef?.nativeElement.focus(), 0);
  }

  public search(): void {
    if (this.form.invalid) {
      return;
    }
    const query = this.query.value?.trim();
    if (!query) {
      return;
    }
    this._repository.addToHistory(query);
    this._repository.setFilter({ query });
  }

  public searchByEnter(event: KeyboardEvent): void {
    event.stopPropagation();
    this.search();
  }

  public onQueryPeek(query: string): void {
    this.query.setValue(query);
    setTimeout(() => {
      this.queryTabIndex = 0;
      this.queryElementRef?.nativeElement.focus();
    }, 0);
  }

  public onQueryChange(query: string): void {
    this.query.setValue(query);
    this._repository.addToHistory(query);
    this._repository.setFilter({ query });
  }

  public onSearchRequest(query: string): void {
    this.query.setValue(query);
    this.query.markAsDirty();
    this.query.updateValueAndValidity();
    this.search();
  }

  public onPageChange(event: PageEvent): void {
    this._repository.setPage(event.pageIndex + 1, event.pageSize);
  }

  public clearResults(): void {
    this._repository.clear();
  }

  public readDocument(id: number) {
    this._repository.setReadRequest({
      documentId: id,
    });
  }

  public readDocumentPiece(id: number, start: number, length: number) {
    this._repository.setReadRequest({
      documentId: id,
      start: start,
      end: start + length,
    });
  }
}
