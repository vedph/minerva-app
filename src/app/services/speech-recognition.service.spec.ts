import { TestBed } from '@angular/core/testing';

import {
  FakeSpeechRecognition,
  installFakeSpeechRecognition,
  speechResult as result,
  uninstallFakeSpeechRecognition,
} from '../../testing/fake-speech-recognition';

import {
  SPEECH_RECOGNITION_LANG,
  SpeechRecognitionService,
} from './speech-recognition.service';

function createService(lang = 'it-IT'): SpeechRecognitionService {
  TestBed.configureTestingModule({
    providers: [
      SpeechRecognitionService,
      { provide: SPEECH_RECOGNITION_LANG, useValue: lang },
    ],
  });
  return TestBed.inject(SpeechRecognitionService);
}

describe('SpeechRecognitionService', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    uninstallFakeSpeechRecognition();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('when the browser has no speech recognition', () => {
    let service: SpeechRecognitionService;

    beforeEach(() => {
      service = createService();
    });

    it('should be unsupported', () => {
      expect(service.unsupported).toBe(true);
      expect(console.warn).toHaveBeenCalledWith(
        'Speech recognition is not supported in this browser.',
      );
    });

    it('should not start listening', () => {
      const listening = vi.fn();
      service.listening$.subscribe(listening);

      service.startListening();

      expect(service.isListening()).toBe(false);
      expect(listening.mock.calls).toEqual([[false]]);
    });

    it('should ignore a request to stop listening', () => {
      const listening = vi.fn();
      service.listening$.subscribe(listening);

      service.stopListening();

      expect(listening.mock.calls).toEqual([[false]]);
    });
  });

  describe('when the browser has speech recognition', () => {
    let service: SpeechRecognitionService;
    let recognition: FakeSpeechRecognition;

    beforeEach(() => {
      installFakeSpeechRecognition();
      service = createService('en-GB');
      recognition = FakeSpeechRecognition.last!;
    });

    it('should be supported', () => {
      expect(service.unsupported).toBe(false);
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should configure the engine for continuous recognition in the specified language', () => {
      expect(recognition.continuous).toBe(true);
      expect(recognition.interimResults).toBe(true);
      expect(recognition.lang).toBe('en-GB');
    });

    it('should not be listening initially', () => {
      const listening = vi.fn();
      const text = vi.fn();
      service.listening$.subscribe(listening);
      service.text$.subscribe(text);

      expect(service.isListening()).toBe(false);
      expect(listening.mock.calls).toEqual([[false]]);
      expect(text.mock.calls).toEqual([['']]);
      expect(recognition.start).not.toHaveBeenCalled();
    });

    it('should start the engine when starting to listen', () => {
      const listening = vi.fn();
      service.listening$.subscribe(listening);

      service.startListening();

      expect(recognition.start).toHaveBeenCalledTimes(1);
      expect(service.isListening()).toBe(true);
      expect(listening).toHaveBeenLastCalledWith(true);
    });

    it('should reset the text when starting to listen', () => {
      const text = vi.fn();
      service.startListening();
      recognition.emitResults([result('ciao')]);
      service.stopListening();
      service.text$.subscribe(text);

      service.startListening();

      expect(text.mock.calls).toEqual([['ciao'], ['']]);
    });

    it('should stop the engine when stopping to listen', () => {
      service.startListening();

      service.stopListening();

      expect(recognition.stop).toHaveBeenCalledTimes(1);
      expect(service.isListening()).toBe(false);
    });

    it('should emit the transcript of a final result', () => {
      const text = vi.fn();
      service.text$.subscribe(text);
      service.startListening();

      recognition.emitResults([result('trova la parola cane')]);

      expect(text).toHaveBeenLastCalledWith('trova la parola cane');
    });

    it('should join the transcripts of all the final results', () => {
      const text = vi.fn();
      service.text$.subscribe(text);
      service.startListening();

      recognition.emitResults([result('trova '), result('la parola')]);

      expect(text).toHaveBeenLastCalledWith('trova la parola');
    });

    it('should ignore interim results', () => {
      const text = vi.fn();
      service.text$.subscribe(text);
      service.startListening();

      recognition.emitResults([result('trova '), result('la paro', false)]);

      expect(text).toHaveBeenLastCalledWith('trova ');
    });

    it('should keep the text recognized before a pause', () => {
      const text = vi.fn();
      service.text$.subscribe(text);
      service.startListening();
      recognition.emitResults([result('trova ')]);

      // only the second result changed
      recognition.emitResults([result('trova '), result('la parola')], 1);

      expect(text).toHaveBeenLastCalledWith('trova la parola');
    });

    it('should keep the recognized text while new speech is not final yet', () => {
      const text = vi.fn();
      service.text$.subscribe(text);
      service.startListening();
      recognition.emitResults([result('trova ')]);

      recognition.emitResults([result('trova '), result('la pa', false)], 1);

      expect(text).toHaveBeenLastCalledWith('trova ');
    });

    it('should not start the engine again when already listening', () => {
      const listening = vi.fn();
      service.startListening(1000);
      service.listening$.subscribe(listening);

      service.startListening(1000);

      expect(recognition.start).toHaveBeenCalledTimes(1);
      expect(listening.mock.calls).toEqual([[true]]);
    });

    it('should not be listening when the engine fails to start', () => {
      const listening = vi.fn();
      const text = vi.fn();
      service.listening$.subscribe(listening);
      service.text$.subscribe(text);
      recognition.start.mockImplementation(() => {
        throw new Error('already started');
      });

      service.startListening(1000);

      expect(service.isListening()).toBe(false);
      expect(listening.mock.calls).toEqual([[false]]);
      expect(text.mock.calls).toEqual([['']]);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should be able to listen again after a failed start', () => {
      recognition.start.mockImplementationOnce(() => {
        throw new Error('already started');
      });
      service.startListening();

      service.startListening();

      expect(service.isListening()).toBe(true);
    });

    it('should ignore a request to stop when not listening', () => {
      const listening = vi.fn();
      service.listening$.subscribe(listening);

      service.stopListening();

      expect(recognition.stop).not.toHaveBeenCalled();
      expect(listening.mock.calls).toEqual([[false]]);
    });

    it('should not be listening even when the engine fails to stop', () => {
      service.startListening();
      recognition.stop.mockImplementation(() => {
        throw new Error('not started');
      });

      service.stopListening();

      expect(service.isListening()).toBe(false);
    });

    it('should stop listening when the engine ends by itself', () => {
      const listening = vi.fn();
      service.startListening();
      service.listening$.subscribe(listening);

      recognition.emitEnd();

      expect(service.isListening()).toBe(false);
      expect(listening.mock.calls).toEqual([[true], [false]]);
      expect(recognition.stop).not.toHaveBeenCalled();
    });

    it('should stop listening when the engine fails', () => {
      service.startListening();

      recognition.emitError('not-allowed');

      expect(service.isListening()).toBe(false);
      expect(console.warn).toHaveBeenCalledWith(
        'Speech recognition error: not-allowed',
      );
    });

    it('should notify the end of listening once when the engine ends after a stop', () => {
      const listening = vi.fn();
      service.startListening();
      service.listening$.subscribe(listening);

      service.stopListening();
      recognition.emitEnd();

      expect(listening.mock.calls).toEqual([[true], [false]]);
    });

    it('should stop checking for the timeout when the engine ends by itself', () => {
      vi.useFakeTimers();
      service.startListening(1000);

      recognition.emitEnd();

      expect(vi.getTimerCount()).toBe(0);
    });

    it('should listen again after the engine ended by itself', () => {
      service.startListening();
      recognition.emitEnd();

      service.startListening();

      expect(recognition.start).toHaveBeenCalledTimes(2);
      expect(service.isListening()).toBe(true);
    });

    it('should not log while waiting for the timeout', () => {
      vi.useFakeTimers();
      service.startListening(1000);
      recognition.emitResults([result('ciao')]);

      vi.advanceTimersByTime(2000);

      expect(console.log).not.toHaveBeenCalled();
    });

    it('should release the engine when destroyed while listening', () => {
      vi.useFakeTimers();
      const listening = vi.fn();
      const done = vi.fn();
      service.startListening(1000);
      service.listening$.subscribe({ next: listening, complete: done });

      TestBed.resetTestingModule();

      expect(recognition.abort).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
      expect(done).toHaveBeenCalledTimes(1);
      // events fired by the engine after destroy are ignored
      recognition.emitResults([result('ciao')]);
      recognition.emitEnd();
      expect(listening.mock.calls).toEqual([[true]]);
    });

    it('should not touch an idle engine when destroyed', () => {
      TestBed.resetTestingModule();

      expect(recognition.abort).not.toHaveBeenCalled();
      expect(recognition.stop).not.toHaveBeenCalled();
    });

    it('should keep listening with no timeout', () => {
      vi.useFakeTimers();
      service.startListening();
      recognition.emitResults([result('ciao')]);

      vi.advanceTimersByTime(60_000);

      expect(service.isListening()).toBe(true);
      expect(recognition.stop).not.toHaveBeenCalled();
    });

    it('should stop listening once the timeout elapsed since the last result', () => {
      vi.useFakeTimers();
      service.startListening(3000);
      recognition.emitResults([result('ciao')]);

      vi.advanceTimersByTime(2999);
      expect(service.isListening()).toBe(true);

      vi.advanceTimersByTime(250);
      expect(service.isListening()).toBe(false);
      expect(recognition.stop).toHaveBeenCalledTimes(1);
    });

    it('should stop listening once the timeout elapsed since the speech end', () => {
      vi.useFakeTimers();
      service.startListening(1000);
      vi.advanceTimersByTime(500);
      recognition.onspeechend?.();

      vi.advanceTimersByTime(750);
      expect(service.isListening()).toBe(true);

      vi.advanceTimersByTime(250);
      expect(service.isListening()).toBe(false);
    });

    it('should restart the timeout at each result', () => {
      vi.useFakeTimers();
      service.startListening(1000);
      recognition.emitResults([result('trova ')]);
      vi.advanceTimersByTime(750);
      recognition.emitResults([result('trova '), result('la parola')]);

      vi.advanceTimersByTime(750);
      expect(service.isListening()).toBe(true);

      vi.advanceTimersByTime(250);
      expect(service.isListening()).toBe(false);
    });

    it('should not time out before any speech is heard', () => {
      vi.useFakeTimers();
      service.startListening(1000);

      vi.advanceTimersByTime(60_000);

      expect(service.isListening()).toBe(true);
    });

    it('should stop checking for the timeout once stopped', () => {
      vi.useFakeTimers();
      service.startListening(1000);
      recognition.emitResults([result('ciao')]);
      service.stopListening();

      vi.advanceTimersByTime(60_000);

      expect(recognition.stop).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  it('should fall back to the prefixed speech recognition engine', () => {
    installFakeSpeechRecognition('webkitSpeechRecognition');

    const service = createService();

    expect(service.unsupported).toBe(false);
    expect(FakeSpeechRecognition.last?.lang).toBe('it-IT');
  });
});

describe('SPEECH_RECOGNITION_LANG', () => {
  it('should default to Italian', () => {
    TestBed.configureTestingModule({});

    expect(TestBed.inject(SPEECH_RECOGNITION_LANG)).toBe('it-IT');
  });
});
