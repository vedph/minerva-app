import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PqitaService } from '../../services/pqita.service';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';

const MAX_HISTORY = 10;

interface HistoryEntry {
  text: string;
  query: string;
}

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
    MatTooltipModule,
  ],
  providers: [SpeechRecognitionService],
  templateUrl: './pqita.component.html',
  styleUrl: './pqita.component.scss',
})
export class PqitaComponent implements OnInit {
  public text: FormControl<string | null>;
  public autoRun: FormControl<boolean>;
  public query: FormControl<string | null>;
  public history: FormControl<HistoryEntry[]>;
  public form: FormGroup;

  public listening?: boolean;

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
  }

  public ngOnInit(): void {
    // when the speech recognition service detects a result, update the text field
    // supplying quotes to the text
    this._speechRecService.onResult((text) => {
      this.text.setValue(this._pqitaService.supplyQuotes(text));
      this.text.markAsDirty();
      this.text.updateValueAndValidity();
      this.convert();
    });
  }

  public startListening() {
    if (this.listening) {
      return;
    }
    this.listening = true;
    if (this.autoRun.value) {
      this._speechRecService.startListeningWithTimeout();
    } else {
      this._speechRecService.startListening();
    }
  }

  public stopListening() {
    if (!this.listening) {
      return;
    }
    this._speechRecService.stopListening();
    this.listening = false;

    if (this.autoRun.value) {
      this.convert();
    }
  }

  public clearText() {
    this.text.reset();
    this.query.reset();
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
    if (this.listening) {
      return;
    }
    const entries = [...this.history.value];
    entries.splice(index, 1);
    this.history.setValue(entries);
    this.history.markAsDirty();
    this.history.updateValueAndValidity;
  }

  public pickFromHistory(index: number): void {
    if (this.listening) {
      return;
    }
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

  public convert(): void {
    if (this.form.invalid || this.listening) {
      return;
    }
    const query = this._pqitaService.convertQuery(this.text.value!);
    this.query.setValue(query);
    this.query.markAsDirty();
    this.query.updateValueAndValidity();

    this.appendToHistory(this.text.value!, query);

    if (this.autoRun.value) {
      this.searchRequest.emit(query);
    }
  }

  public search(): void {
    if (this.form.invalid || this.listening) {
      return;
    }
    this.searchRequest.emit(this.query.value!);
  }
}
