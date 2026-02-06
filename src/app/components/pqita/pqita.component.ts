import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
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

/**
 * Component to convert text to a query and search for it.
 */
@Component({
  selector: 'minerva-pqita',
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
})
export class PqitaComponent implements OnInit, OnDestroy {
  private readonly _subs: Subscription[] = [];

  /**
   * Whether to make the converted query read-only.
   */
  public readonly readonlyQuery = input<boolean>();

  public readonly searchRequest = output<string>();

  public readonly noSpeech = signal<boolean>(false);
  public readonly presetEntries = signal<PqitaPresetEntry[]>([]);
  public readonly filteredPresetEntries = signal<PqitaPresetEntry[]>([]);
  public readonly presetGroups = computed<string[]>(() => {
    return this.presetEntries()
      ? Array.from<string>(
          new Set(this.presetEntries().map((e) => e.group || '-')),
        )
      : [];
  });

  public readonly listening$: Observable<boolean>;

  public presetGroup: FormControl<string | null>;
  public presetEntry: FormControl<PqitaPresetEntry | null>;

  public text: FormControl<string | null>;
  public autoRun: FormControl<boolean>;
  public query: FormControl<string | null>;
  public history: FormControl<HistoryEntry[]>;
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private _pqitaService: PqitaService,
    private _speechRecService: SpeechRecognitionService,
    env: EnvService,
  ) {
    this.noSpeech.set(this._speechRecService.unsupported);

    this.presetEntries.set(
      (env.get('pqitaPresetEntries') as PqitaPresetEntry[] | undefined) || [],
    );

    this.presetGroup = formBuilder.control(null);
    this.presetEntry = formBuilder.control(null);
    this.text = formBuilder.control(null, {
      validators: [Validators.required, Validators.maxLength(1000)],
    });
    this.autoRun = formBuilder.control(false, { nonNullable: true });
    this.query = formBuilder.control(null);
    this.history = formBuilder.control([], { nonNullable: true });
    this.form = formBuilder.group({
      presetGroup: this.presetGroup,
      presetEntry: this.presetEntry,
      text: this.text,
      autoRun: this.autoRun,
      query: this.query,
      history: this.history,
    });

    this.listening$ = this._speechRecService.listening$;

    // when listening$ changes to false, convert the text to a query
    // and emit the search request if autoRun is true
    this._subs.push(
      this.listening$.subscribe((listening) => {
        if (!listening) {
          this.convert(true);
          if (this.autoRun.value && this.query.value) {
            this.searchRequest.emit(this.query.value);
          }
        }
      }),
    );

    // when the speech recognition service detects a result, update the text field
    // supplying quotes to the text
    this._subs.push(
      this._speechRecService.text$
        .pipe(distinctUntilChanged(), debounceTime(100))
        .subscribe((text) => {
          this.text.setValue(this._pqitaService.supplyQuotes(text));
          this.text.markAsDirty();
          this.text.updateValueAndValidity();
        }),
    );

    // when preset group changes, filter the preset entries in the control
    this._subs.push(
      this.presetGroup.valueChanges
        .pipe(distinctUntilChanged(), debounceTime(300))
        .subscribe((group) => {
          // clear the preset entry
          if (this.presetEntry.value) {
            this.presetEntry.setValue(null);
            this.presetEntry.markAsDirty();
            this.presetEntry.updateValueAndValidity();
          }
          // set the filtered preset entries
          this.setFilteredPresetEntries(group);
        }),
    );

    this.presetGroup.setValue(null);
  }

  private setFilteredPresetEntries(group?: string | null): void {
    this.filteredPresetEntries.set(
      this.presetEntries()
        ? this.presetEntries().filter((e) => e.group === group || !group)
        : [],
    );
  }

  public ngOnInit(): void {
    if (this.presetGroups().length > 0) {
      this.presetGroup.setValue(this.presetGroups()[0]);
      this.setFilteredPresetEntries(this.presetGroups()[0]);
    }
  }

  public ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
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
    if (event.ctrlKey && event.key === 't' && this.form.valid) {
      this.search();
      event.preventDefault();
    }
  }

  public startListening() {
    if (this.autoRun.value) {
      this._speechRecService.startListening(3000);
    } else {
      this._speechRecService.startListening();
    }
  }

  public stopListening() {
    this._speechRecService.stopListening();
    if (this.text.value) {
      this.convert();
    }
  }

  public clearText() {
    this.text.reset();
    this.query.reset();
  }

  public pickFromPreset() {
    if (this.presetEntry.value) {
      this.text.setValue(this.presetEntry.value.value);
      this.text.markAsDirty();
      this.text.updateValueAndValidity();
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
    const entries = [...this.history.value];
    entries.splice(0, 0, { text, query });

    if (entries.length > MAX_HISTORY) {
      entries.pop();
    }
    this.history.setValue(entries);
    this.history.markAsDirty();
    this.history.updateValueAndValidity();
  }

  public removeFromHistory(index: number): void {
    const entries = [...this.history.value];
    entries.splice(index, 1);
    this.history.setValue(entries);
    this.history.markAsDirty();
    this.history.updateValueAndValidity();
  }

  public pickFromHistory(index: number): void {
    const entry = this.history.value[index];
    this.text.setValue(entry.text);
    this.text.markAsDirty();
    this.text.updateValueAndValidity();

    this.query.setValue(entry.query);
    this.query.markAsDirty();
    this.query.updateValueAndValidity();

    if (this.autoRun.value) {
      this.searchRequest.emit(entry.query);
    }
  }

  public convert(history = false): void {
    if (this.form.invalid) {
      return;
    }
    try {
      const query = this._pqitaService.convertQuery(this.text.value!);
      this.query.setValue(query);
      this.query.markAsDirty();
      this.query.updateValueAndValidity();
      if (history && query) {
        this.appendToHistory(this.text.value!, query);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  public search(): void {
    if (this.form.invalid) {
      return;
    }
    this.searchRequest.emit(this.query.value!);
  }
}
