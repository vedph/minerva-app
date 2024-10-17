import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const SPEECH_RECOGNITION_LANG = 'SPEECH_RECOGNITION_LANG';

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

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onspeechend: () => void;
  start(): void;
  stop(): void;
}

@Injectable()
export class SpeechRecognitionService {
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

  constructor(@Inject(SPEECH_RECOGNITION_LANG) lang: string = 'it-IT') {
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
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            transcript += result[0].transcript;
          }
        }
        this._lastSpeechEnd = Date.now();
        this._text$.next(transcript);
      };
    }
  }

  public isListening(): boolean {
    return this._listening$.value;
  }

  public startListening(timeout?: number) {
    if (this.unsupported) {
      return;
    }
    this._lastSpeechEnd = 0;
    this._text$.next('');
    this._listening$.next(true);
    this._recognition!.start();

    if (timeout) {
      this._timer = window.setInterval(() => {
        const n = Date.now() - this._lastSpeechEnd;
        console.log(n);
        if (this._lastSpeechEnd && n >= timeout) {
          console.log('Speech recognition timeout');
          this.stopListening();
        }
      }, 250);
    }
  }

  public stopListening() {
    if (this.unsupported) {
      return;
    }
    if (this._timer !== undefined) {
      window.clearInterval(this._timer);
      this._timer = undefined;
    }
    this._recognition!.stop();
    this._listening$.next(false);
  }
}
