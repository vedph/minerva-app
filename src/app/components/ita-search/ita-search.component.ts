import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
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

import { DataPage } from '@myrmidon/ngx-tools';

import { DocumentReadRequest } from '@myrmidon/pythia-core';
import { KwicSearchResult } from '@myrmidon/pythia-api';
import { DocumentReaderComponent } from '@myrmidon/pythia-document-reader';
import {
  SearchExportComponent,
  SearchRepository,
} from '@myrmidon/pythia-search';

import { PqitaComponent } from '../pqita/pqita.component';

@Component({
  selector: 'minerva-ita-search',
  imports: [
    CommonModule,
    FormField,
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
    PqitaComponent,
    DocumentReaderComponent,
    SearchExportComponent,
  ],
  templateUrl: './ita-search.component.html',
  styleUrl: './ita-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItaSearchComponent implements OnInit, OnDestroy {
  private readonly _repository = inject(SearchRepository);
  private readonly _subs: Subscription[] = [];

  public readonly queryElementRef = viewChild<ElementRef>('queryCtl');

  /**
   * Initial query term to be set in the search box.
   */
  public readonly initialQueryTerm = input<string>();

  /**
   * Whether to hide the author field in the search results.
   */
  public readonly hideAuthor = input<boolean>();

  /**
   * Whether to hide the title field in the search results.
   */
  public readonly hideTitle = input<boolean>();

  /**
   * Whether to make the converted query read-only.
   */
  public readonly readonlyQuery = input<boolean>();

  /**
   * Whether to hide the document map in the reader. When hidden, users can
   * read only the context of each result, and not browse whole documents
   * (so also the read document button is hidden).
   */
  public readonly hideMap = input<boolean>();

  public readonly leftContextLabels = signal<string[]>([
    '5',
    '4',
    '3',
    '2',
    '1',
  ]);
  public readonly rightContextLabels = signal<string[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
  ]);
  public readonly queryTabIndex = signal<number>(0);
  public readonly queryExpanded = signal<boolean>(true);

  public readonly query$: Observable<string | undefined> =
    this._repository.query$;
  public readonly lastQueries$: Observable<string[]> =
    this._repository.lastQueries$;
  public readonly loading$: Observable<boolean | undefined> =
    this._repository.loading$;
  public readonly page$: Observable<DataPage<KwicSearchResult> | undefined> =
    this._repository.page$;
  public readonly error$: Observable<string | undefined> =
    this._repository.error$;
  public readonly readRequest$: Observable<DocumentReadRequest | undefined> =
    this._repository.readRequest$;

  public readonly form = form(
    signal<{ query: string; history: string | null }>({
      query: '',
      history: null,
    }),
    (path) => {
      required(path.query);
      maxLength(path.query, 1000);
    },
  );

  public ngOnInit(): void {
    if (this.initialQueryTerm()) {
      // if ends with # plus L/W plus id, search for lemma or word by id
      const m = this.initialQueryTerm()?.match(/^([^#]+)#([LW])(\d+)$/);
      if (m) {
        const type = m[2];
        const id = parseInt(m[3], 10);
        if (type === 'L') {
          this.form.query().value.set(`[lemma_id="${id}"]`);
        } else {
          this.form.query().value.set(`[word_id="${id}"]`);
        }
      } else {
        // otherwise, just set the query text
        this.form.query().value.set(`[value="${this.initialQueryTerm()}"]`);
      }

      setTimeout(() => this.search(), 0);
    }

    // when page$ changes, set queryExpanded to false if page has any items
    this._subs.push(
      this._repository.page$.subscribe((page) => {
        this.queryExpanded.set(!page?.items.length || !page.items.length);
      }),
    );
  }

  public ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }

  public pageChange(event: PageEvent): void {
    this._repository.loadPage(event.pageIndex + 1, event.pageSize, {
      query: this.form.query().value(),
    });
  }

  public pickHistory(): void {
    const history = this.form.history().value();
    if (!history) {
      return;
    }
    this.form.query().value.set(history);
    setTimeout(() => this.queryElementRef()?.nativeElement.focus(), 0);
  }

  public search(): void {
    if (this.form().invalid()) {
      return;
    }
    const query = this.form.query().value().trim();
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
    this.form.query().value.set(query);
    setTimeout(() => {
      this.queryTabIndex.set(0);
      this.queryElementRef()?.nativeElement.focus();
    }, 0);
  }

  public onQueryChange(query: string): void {
    this.form.query().value.set(query);
    this._repository.addToHistory(query);
    this._repository.setFilter({ query });
  }

  public onSearchRequest(query: string): void {
    this.form.query().value.set(query);
    this.form.query().markAsDirty();
    this.search();
  }

  public onPageChange(event: PageEvent): void {
    this._repository.setPage(event.pageIndex + 1, event.pageSize);
  }

  public clearResults(): void {
    this._repository.clear();
  }

  public readDocument(id: number) {
    // reading a whole document requires browsing it via its map
    if (this.hideMap()) {
      return;
    }
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
