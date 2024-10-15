import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PqitaService } from '../../services/pqita.service';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';

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
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [SpeechRecognitionService],
  templateUrl: './pqita.component.html',
  styleUrl: './pqita.component.scss',
})
export class PqitaComponent implements OnDestroy {
  private readonly _subs: Subscription[] = [];
  public text: FormControl<string | null>;
  public autoRun: FormControl<boolean>;
  public query: FormControl<string | null>;
  public history: FormControl<HistoryEntry[]>;
  public form: FormGroup;

  public readonly listening$: Observable<boolean>;

  @Output()
  public searchRequest: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    formBuilder: FormBuilder,
    private _pqitaService: PqitaService,
    private _speechRecService: SpeechRecognitionService
  ) {
    this.text = formBuilder.control(null, {
      validators: [Validators.required, Validators.maxLength(1000)],
    });
    this.autoRun = formBuilder.control(false, { nonNullable: true });
    this.query = formBuilder.control(null);
    this.history = formBuilder.control([], { nonNullable: true });
    this.form = formBuilder.group({
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
      })
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
        })
    );
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
    this.history.updateValueAndValidity;
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
    const query = this._pqitaService.convertQuery(this.text.value!);
    this.query.setValue(query);
    this.query.markAsDirty();
    this.query.updateValueAndValidity();

    if (history && query) {
      this.appendToHistory(this.text.value!, query);
    }
  }

  public search(): void {
    if (this.form.invalid) {
      return;
    }
    this.searchRequest.emit(this.query.value!);
  }
}
