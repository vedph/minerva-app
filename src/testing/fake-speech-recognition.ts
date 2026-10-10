export interface FakeSpeechResult {
  isFinal: boolean;
  0: { transcript: string; confidence: number };
}

/**
 * Build a recognition result with the specified transcript.
 */
export function speechResult(
  transcript: string,
  isFinal = true,
): FakeSpeechResult {
  return { isFinal, 0: { transcript, confidence: 1 } };
}

/**
 * Minimal stand-in for the browser's speech recognition engine, which is
 * not available in the test environment.
 */
export class FakeSpeechRecognition {
  /**
   * The last created engine.
   */
  public static last?: FakeSpeechRecognition;

  public continuous = false;
  public interimResults = false;
  public lang = '';
  public onresult?: ((event: unknown) => void) | null;
  public onspeechend?: (() => void) | null;
  public onend?: (() => void) | null;
  public onerror?: ((event: unknown) => void) | null;
  public start = vi.fn();
  public stop = vi.fn();
  public abort = vi.fn();

  constructor() {
    FakeSpeechRecognition.last = this;
  }

  /**
   * Simulate the engine recognizing the specified results.
   */
  public emitResults(results: FakeSpeechResult[], resultIndex = 0): void {
    this.onresult?.({ resultIndex, results });
  }

  /**
   * Simulate the engine ending the recognition session.
   */
  public emitEnd(): void {
    this.onend?.();
  }

  /**
   * Simulate the engine failing with the specified error code, which
   * always ends the recognition session.
   */
  public emitError(error: string): void {
    this.onerror?.({ error });
    this.emitEnd();
  }
}

const globals = window as unknown as Record<string, unknown>;

/**
 * Make the fake engine available to the code under test with the specified
 * global name.
 */
export function installFakeSpeechRecognition(name = 'SpeechRecognition'): void {
  globals[name] = FakeSpeechRecognition;
}

/**
 * Remove the fake engine installed by installFakeSpeechRecognition.
 */
export function uninstallFakeSpeechRecognition(): void {
  delete globals['SpeechRecognition'];
  delete globals['webkitSpeechRecognition'];
  FakeSpeechRecognition.last = undefined;
}
