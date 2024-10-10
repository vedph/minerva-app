import { Inject, Injectable } from '@angular/core';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

/**
 * Injection token for the speech recognition language used by
 * the speech recognition service.
 */
export const SPEECH_RECOGNITION_LANG = 'SPEECH_RECOGNITION_LANG';

/**
 * Service for speech recognition.
 */
@Injectable()
export class SpeechRecognitionService {
  private readonly _recognition: any;

  /**
   * True if the service is currently listening for speech.
   */
  public isListening: boolean = false;

  /**
   * Build the speech recognition service.
   * @param lang The language to use for speech recognition.
   */
  constructor(@Inject(SPEECH_RECOGNITION_LANG) lang: string = 'it-IT') {
    const { webkitSpeechRecognition }: IWindow = window as unknown as IWindow;
    this._recognition = new webkitSpeechRecognition();
    this._recognition.continuous = true;
    this._recognition.interimResults = true;
    this._recognition.lang = lang;
  }

  /**
   * Start listening for speech.
   */
  public startListening() {
    this.isListening = true;
    this._recognition.start();
  }

  /**
   * Stop listening for speech.
   */
  public stopListening() {
    this.isListening = false;
    this._recognition.stop();
  }

  /**
   * Register a callback for when speech is recognized.
   * @param callback The callback to register.
   */
  public onResult(callback: (text: string) => void) {
    this._recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      callback(transcript);
    };
  }
}
