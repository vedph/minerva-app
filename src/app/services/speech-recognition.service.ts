import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

export const SPEECH_RECOGNITION_LANG = 'SPEECH_RECOGNITION_LANG';

@Injectable()
export class SpeechRecognitionService {
  private readonly _recognition: any;
  private readonly _listening$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private readonly _text$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _lastSpeechEnd: number = 0;
  private _timer?: number;

  public listening$: Observable<boolean> = this._listening$.asObservable();
  public text$: Observable<string> = this._text$.asObservable();

  constructor(@Inject(SPEECH_RECOGNITION_LANG) lang: string = 'it-IT') {
    const { webkitSpeechRecognition }: IWindow = window as unknown as IWindow;
    this._recognition = new webkitSpeechRecognition();
    this._recognition.continuous = true;
    this._recognition.interimResults = true;
    this._recognition.lang = lang;

    this._recognition.onspeechend = () => {
      this._lastSpeechEnd = Date.now();
    };

    this._recognition.onresult = (event: any) => {
      let sb: string[] = [];
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        sb.push(event.results[i][0].transcript);
      }
      this._lastSpeechEnd = Date.now();
      this._text$.next(sb.join(''));
    };
  }

  public isListening(): boolean {
    return this._listening$.value;
  }

  public startListening(timeout?: number) {
    this._lastSpeechEnd = 0;
    this._text$.next('');
    this._listening$.next(true);
    this._recognition.start();

    // if timeout is set, start a timer which checks if the last speech end
    // is equal to or greater than the timeout, and if so it stops listening
    if (timeout) {
      this._timer = setInterval(() => {
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
    if (this._timer !== undefined) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
    this._recognition.stop();
    this._listening$.next(false);
  }
}
