import { inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * The language used for speech recognition (BCP 47 tag). Default is Italian.
 */
export const SPEECH_RECOGNITION_LANG = new InjectionToken<string>(
  'SPEECH_RECOGNITION_LANG',
  { providedIn: 'root', factory: () => 'it-IT' },
);

interface IWindow extends Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
}

declare var window: IWindow;

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onspeechend: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

@Injectable()
export class SpeechRecognitionService implements OnDestroy {
  private readonly _recognition?: SpeechRecognition;
  private readonly _listening$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private readonly _text$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _lastSpeechEnd: number = 0;
  private _timer?: number;

  public listening$: Observable<boolean> = this._listening$.asObservable();
  public text$: Observable<string> = this._text$.asObservable();
  public unsupported: boolean;

  constructor() {
    const lang = inject(SPEECH_RECOGNITION_LANG);

    if (
      !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    ) {
      this.unsupported = true;
      console.warn('Speech recognition is not supported in this browser.');
    } else {
      this.unsupported = false;
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this._recognition = new SpeechRecognition();

      this._recognition.continuous = true;
      this._recognition.interimResults = true;
      this._recognition.lang = lang;

      this._recognition.onspeechend = () => {
        this._lastSpeechEnd = Date.now();
      };

      this._recognition.onresult = (event: SpeechRecognitionEvent) => {
        // the results list holds all the results of the session, so collect
        // all the final ones rather than only those changed by this event,
        // or the text recognized before a pause would be lost
        let transcript = '';
        for (let i = 0; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            transcript += result[0].transcript;
          }
        }
        this._lastSpeechEnd = Date.now();
        this._text$.next(transcript);
      };

      this._recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        // the engine always ends after an error, so onend does the cleanup
        console.warn(`Speech recognition error: ${event.error}`);
      };

      // the engine can end by itself (e.g. on error, denied permission,
      // or prolonged silence): keep our state in synch with it
      this._recognition.onend = () => {
        this.setNotListening();
      };
    }
  }

  private clearTimer(): void {
    if (this._timer !== undefined) {
      window.clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  private setNotListening(): void {
    this.clearTimer();
    if (this._listening$.value) {
      this._listening$.next(false);
    }
  }

  public ngOnDestroy(): void {
    this.clearTimer();
    if (this._recognition) {
      // detach before aborting, so that no event is handled after destroy
      this._recognition.onresult = null;
      this._recognition.onspeechend = null;
      this._recognition.onerror = null;
      this._recognition.onend = null;
      if (this._listening$.value) {
        try {
          this._recognition.abort();
        } catch (error) {
          console.warn('Unable to abort speech recognition', error);
        }
      }
    }
    this._listening$.complete();
    this._text$.complete();
  }

  public isListening(): boolean {
    return this._listening$.value;
  }

  public startListening(timeout?: number) {
    if (this.unsupported || this._listening$.value) {
      return;
    }
    try {
      // this throws e.g. when the engine is still ending a previous session
      this._recognition!.start();
    } catch (error) {
      console.warn('Unable to start speech recognition', error);
      return;
    }
    this._lastSpeechEnd = 0;
    this._text$.next('');
    this._listening$.next(true);

    if (timeout) {
      this._timer = window.setInterval(() => {
        if (
          this._lastSpeechEnd &&
          Date.now() - this._lastSpeechEnd >= timeout
        ) {
          this.stopListening();
        }
      }, 250);
    }
  }

  public stopListening() {
    if (this.unsupported || !this._listening$.value) {
      return;
    }
    try {
      this._recognition!.stop();
    } catch (error) {
      console.warn('Unable to stop speech recognition', error);
    }
    this.setNotListening();
  }
}
