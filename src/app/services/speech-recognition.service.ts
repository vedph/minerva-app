import { Inject, Injectable } from '@angular/core';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

export const SPEECH_RECOGNITION_LANG = 'SPEECH_RECOGNITION_LANG';

@Injectable()
export class SpeechRecognitionService {
  private readonly _recognition: any;
  private _timeoutId: number | null = null;
  private _lastSpeechTimestamp: number = 0;

  public isListening: boolean = false;

  constructor(@Inject(SPEECH_RECOGNITION_LANG) lang: string = 'it-IT') {
    const { webkitSpeechRecognition }: IWindow = window as unknown as IWindow;
    this._recognition = new webkitSpeechRecognition();
    this._recognition.continuous = true;
    this._recognition.interimResults = true;
    this._recognition.lang = lang;

    this._recognition.onspeechstart = () => {
      this._lastSpeechTimestamp = Date.now();
    };

    this._recognition.onspeechend = () => {
      this._lastSpeechTimestamp = Date.now();
    };
  }

  public startListening() {
    this.isListening = true;
    this._recognition.start();
  }

  public startListeningWithTimeout(timeout: number = 3) {
    this.startListening();
    this._lastSpeechTimestamp = Date.now();

    const checkSilence = () => {
      const currentTime = Date.now();
      const silenceDuration = (currentTime - this._lastSpeechTimestamp) / 1000;

      if (silenceDuration >= timeout) {
        this.stopListening();
      } else {
        this._timeoutId = window.setTimeout(checkSilence, 100);
      }
    };

    this._timeoutId = window.setTimeout(checkSilence, 100);
  }

  public stopListening() {
    this.isListening = false;
    this._recognition.stop();
    if (this._timeoutId !== null) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  public onResult(callback: (text: string) => void) {
    this._recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      this._lastSpeechTimestamp = Date.now();
      callback(transcript);
    };
  }
}
