import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import {
  form,
  FormField,
  maxLength,
  readonly,
  required,
} from '@angular/forms/signals';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  skip,
  Subscription,
} from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EnvService } from '@myrmidon/ngx-tools';

import { PqitaService } from '../../services/pqita.service';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';

export interface PqitaPresetEntry {
  group?: string;
  value: string;
}

const MAX_HISTORY = 10;

interface HistoryEntry {
  text: string;
  query: string;
}

interface PqitaControls {
  presetGroup: string | null;
  presetEntry: PqitaPresetEntry | null;
  text: string;
  autoRun: boolean;
  query: string;
}

/**
 * Component to convert text to a query and search for it.
 */
@Component({
  selector: 'minerva-pqita',
  imports: [
    CommonModule,
    FormField,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [SpeechRecognitionService],
  templateUrl: './pqita.component.html',
  styleUrl: './pqita.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:keydown)': 'handleKeyboardEvent($event)',
  },
})
export class PqitaComponent implements OnDestroy {
  private readonly _pqitaService = inject(PqitaService);
  private readonly _speechRecService = inject(SpeechRecognitionService);
  private readonly _subs: Subscription[] = [];

  /**
   * Whether to make the converted query read-only.
   */
  public readonly readonlyQuery = input<boolean>();

  public readonly searchRequest = output<string>();

  public readonly noSpeech = signal<boolean>(
    this._speechRecService.unsupported,
  );
  public readonly presetEntries = signal<PqitaPresetEntry[]>(
    (inject(EnvService).get('pqitaPresetEntries') as
      PqitaPresetEntry[] | undefined) || [],
  );
  public readonly presetGroups = computed<string[]>(() =>
    Array.from(new Set(this.presetEntries().map((e) => e.group || '-'))),
  );

  public readonly listening$: Observable<boolean> =
    this._speechRecService.listening$;

  public readonly form = form(
    signal<PqitaControls>({
      presetGroup: this.presetGroups()[0] ?? null,
      presetEntry: null,
      text: '',
      autoRun: false,
      query: '',
    }),
    (path) => {
      required(path.text);
      maxLength(path.text, 1000);
      readonly(path.query, { when: () => !!this.readonlyQuery() });
    },
  );

  public readonly filteredPresetEntries = computed<PqitaPresetEntry[]>(() => {
    const group = this.form.presetGroup().value();
    return this.presetEntries().filter(
      // entries without a group belong to the '-' group
      (e) => !group || (e.group || '-') === group,
    );
  });

  public readonly history = signal<HistoryEntry[]>([]);

  constructor() {
    // when listening$ changes to false, convert the text to a query
    // and emit the search request if autoRun is true
    this._subs.push(
      this.listening$.subscribe((listening) => {
        if (!listening) {
          this.convert(true);
          const query = this.form.query().value();
          if (this.form.autoRun().value() && query) {
            this.searchRequest.emit(query);
          }
        }
      }),
    );

    // when the speech recognition service detects a result, update the text field
    // supplying quotes to the text; the initial empty text is skipped,
    // as it is not a result and would overwrite what the user is typing
    this._subs.push(
      this._speechRecService.text$
        .pipe(distinctUntilChanged(), skip(1), debounceTime(100))
        .subscribe((text) => {
          this.setText(this._pqitaService.supplyQuotes(text));
        }),
    );
  }

  public ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }

  private setText(text: string): void {
    this.form.text().value.set(text);
    this.form.text().markAsDirty();
  }

  private setQuery(query: string): void {
    this.form.query().value.set(query);
    this.form.query().markAsDirty();
  }

  public handleKeyboardEvent(event: KeyboardEvent) {
    // Ctrl + L toggles listening
    if (event.ctrlKey && event.key === 'l') {
      if (this._speechRecService.isListening()) {
        this.stopListening();
      } else {
        this.startListening();
      }
      event.preventDefault();
    }
    // Ctrl + T searches
    if (event.ctrlKey && event.key === 't' && this.form().valid()) {
      this.search();
      event.preventDefault();
    }
  }

  public startListening() {
    if (this.form.autoRun().value()) {
      this._speechRecService.startListening(3000);
    } else {
      this._speechRecService.startListening();
    }
  }

  public stopListening() {
    this._speechRecService.stopListening();
    if (this.form.text().value()) {
      this.convert();
    }
  }

  public clearText() {
    this.form.text().reset('');
    this.form.query().reset('');
  }

  public onPresetGroupChange(): void {
    // the picked entry might not belong to the new group
    this.form.presetEntry().value.set(null);
  }

  public pickFromPreset() {
    const entry = this.form.presetEntry().value();
    if (entry) {
      this.setText(entry.value);
      this.convert();
    }
  }

  public convertByEnter(event: KeyboardEvent): void {
    event.stopPropagation();
    this.convert();
  }

  public searchByEnter(event: KeyboardEvent): void {
    event.stopPropagation();
    this.search();
  }

  private appendToHistory(text: string, query: string) {
    this.history.update((entries) =>
      [{ text, query }, ...entries].slice(0, MAX_HISTORY),
    );
  }

  public removeFromHistory(index: number): void {
    this.history.update((entries) => entries.filter((_, i) => i !== index));
  }

  public pickFromHistory(index: number): void {
    const entry = this.history()[index];
    this.setText(entry.text);
    this.setQuery(entry.query);

    if (this.form.autoRun().value()) {
      this.searchRequest.emit(entry.query);
    }
  }

  public convert(history = false): void {
    if (this.form().invalid()) {
      return;
    }
    try {
      const text = this.form.text().value();
      const query = this._pqitaService.convertQuery(text);
      this.setQuery(query);
      if (history && query) {
        this.appendToHistory(text, query);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  public search(): void {
    // there might be no query yet when using keyboard shortcuts
    const query = this.form.query().value();
    if (this.form().invalid() || !query) {
      return;
    }
    this.searchRequest.emit(query);
  }
}
