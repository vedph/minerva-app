import { Provider } from '@angular/core';
import { render, screen, waitFor, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { provideFakeEnv } from '../../../testing/fake-env';
import {
  FakeSpeechRecognition,
  installFakeSpeechRecognition,
  speechResult,
  uninstallFakeSpeechRecognition,
} from '../../../testing/fake-speech-recognition';
import { PqitaService } from '../../services/pqita.service';
import { SPEECH_RECOGNITION_LANG } from '../../services/speech-recognition.service';
import { PqitaComponent, PqitaPresetEntry } from './pqita.component';

interface SetupOptions {
  presets?: PqitaPresetEntry[];
  readonlyQuery?: boolean;
  speech?: boolean;
  providers?: Provider[];
}

async function setup(options: SetupOptions = {}) {
  if (options.speech) {
    installFakeSpeechRecognition();
  }
  const searchRequest = vi.fn<(query: string) => void>();
  const view = await render(PqitaComponent, {
    inputs: { readonlyQuery: options.readonlyQuery },
    on: { searchRequest },
    providers: [
      provideFakeEnv({ pqitaPresetEntries: options.presets }),
      { provide: SPEECH_RECOGNITION_LANG, useValue: 'it-IT' },
      ...(options.providers ?? []),
    ],
  });
  return {
    ...view,
    user: userEvent.setup(),
    searchRequest,
    recognition: FakeSpeechRecognition.last,
  };
}

const TOO_LONG = 'x'.repeat(1001);

const textBox = () => screen.getByPlaceholderText<HTMLTextAreaElement>('text');
const queryBox = () =>
  screen.getByPlaceholderText<HTMLTextAreaElement>('query');
const button = (name: string) => screen.getByRole('button', { name });
const autorun = () => screen.getByRole('switch', { name: 'Autorun' });

/**
 * The text and query cells of each row in the history table.
 */
function historyRows(): string[][] {
  const table = screen.queryByRole('table');
  if (!table) {
    return [];
  }
  return within(table)
    .getAllByRole('row')
    .slice(1)
    .map((row) =>
      within(row)
        .getAllByRole('cell')
        .slice(1)
        .map((cell) => cell.textContent?.trim() ?? ''),
    );
}

async function selectOption(
  user: ReturnType<typeof userEvent.setup>,
  combobox: HTMLElement,
  name: string | RegExp,
): Promise<void> {
  await user.click(combobox);
  await user.click(await screen.findByRole('option', { name }));
}

describe('PqitaComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    uninstallFakeSpeechRecognition();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('text conversion', () => {
    it('should start with no text, query and history', async () => {
      await setup();

      expect(textBox()).toHaveValue('');
      expect(queryBox()).toHaveValue('');
      expect(historyRows()).toEqual([]);
    });

    it('should disable its buttons until there is something to act on', async () => {
      await setup();

      expect(button('clear')).toBeDisabled();
      expect(button('convert')).toBeDisabled();
      expect(button('search')).toBeDisabled();
    });

    it('should convert the text into a query from the convert button', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola "cane"');
      await user.click(button('convert'));

      expect(queryBox()).toHaveValue('[value="cane"]');
    });

    it('should add the converted text to the history', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola "cane"');
      await user.click(button('convert'));

      expect(historyRows()).toEqual([
        ['trova la parola "cane"', '[value="cane"]'],
      ]);
    });

    it('should convert the text with Ctrl+Enter without adding it to the history', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova il lemma "andare"');
      await user.keyboard('{Control>}{Enter}{/Control}');

      expect(queryBox()).toHaveValue('[lemma="andare"]');
      expect(historyRows()).toEqual([]);
    });

    it('should clear text and query from the clear button', async () => {
      const { user } = await setup();
      await user.type(textBox(), 'cane');
      await user.click(button('convert'));

      await user.click(button('clear'));

      expect(textBox()).toHaveValue('');
      expect(queryBox()).toHaveValue('');
      expect(button('search')).toBeDisabled();
    });

    it('should require some text', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'x');
      await user.clear(textBox());
      await user.tab();

      expect(await screen.findByText('text required')).toBeInTheDocument();
    });

    it('should not let the user enter a text which is too long', async () => {
      const { user } = await setup();

      await user.click(textBox());
      await user.paste('x'.repeat(1001));

      expect(textBox()).toHaveValue('x'.repeat(1000));
    });

    it('should reject a text which is too long', async () => {
      const { user } = await setup({ presets: [{ value: TOO_LONG }] });

      await selectOption(user, screen.getByRole('combobox'), TOO_LONG);
      await user.click(textBox());
      await user.tab();

      expect(await screen.findByText('text too long')).toBeInTheDocument();
      expect(screen.queryByText('text required')).not.toBeInTheDocument();
    });

    it('should not convert a text which is too long', async () => {
      const { user } = await setup({ presets: [{ value: TOO_LONG }] });

      await selectOption(user, screen.getByRole('combobox'), TOO_LONG);
      expect(textBox()).toHaveValue(TOO_LONG);
      await user.click(button('convert'));

      expect(queryBox()).toHaveValue('');
      expect(historyRows()).toEqual([]);
    });

    it('should render no form element', async () => {
      const { container } = await setup();

      expect(container.querySelector('form')).toBeNull();
    });

    it('should keep the current query when the conversion fails', async () => {
      const failure = new Error('conversion failed');
      const { user } = await setup({
        providers: [
          {
            provide: PqitaService,
            useValue: {
              supplyQuotes: (text: string) => text,
              analyze: () => ({ status: 'empty', next: [] }),
              convertQuery: () => {
                throw failure;
              },
            },
          },
        ],
      });

      await user.type(textBox(), 'cane');
      await user.click(button('convert'));

      expect(queryBox()).toHaveValue('');
      expect(historyRows()).toEqual([]);
      expect(console.log).toHaveBeenCalledWith(failure);
    });
  });

  describe('hints', () => {
    it('should show the issue of an invalid text when converting', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola "cane" vicino alla');
      await user.click(button('convert'));

      expect(screen.getByRole('alert')).toHaveTextContent(
        'The sentence is incomplete.',
      );
      expect(queryBox()).toHaveValue('');
      expect(historyRows()).toEqual([]);
    });

    it('should keep the current query when the text is invalid', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola "cane"');
      await user.click(button('convert'));
      await user.type(textBox(), ' xyz');
      await user.click(button('convert'));

      expect(queryBox()).toHaveValue('[value="cane"]');
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Unknown word: "xyz".',
      );
    });

    it('should forget the conversion issue when the text changes', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola');
      await user.click(button('convert'));
      expect(screen.getByRole('alert')).toBeInTheDocument();

      await user.type(textBox(), ' "cane"');

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should show the live issue of an invalid text with its offending part', async () => {
      const { user, container } = await setup();

      await user.type(textBox(), 'trova la parolaccia "cane"');

      expect(
        screen.getByText('Unknown word: "parolaccia".'),
      ).toBeInTheDocument();
      expect(container.querySelector('mark')).toHaveTextContent('parolaccia');
    });

    it('should suggest how to continue the text', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola "cane"');

      expect(
        screen.getByText('The sentence is complete. You can add:'),
      ).toBeInTheDocument();
      expect(button('vicino a')).toBeInTheDocument();
    });

    it('should add a suggestion to the text', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova');
      await user.click(button('parola'));

      expect(textBox()).toHaveValue('trova parola ');
      expect(textBox()).toHaveFocus();
    });

    it('should complete a partially typed word with a suggestion', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola "cane" vic');
      await user.click(button('vicino a'));

      expect(textBox()).toHaveValue('trova la parola "cane" vicino a ');
    });

    it('should describe the hints to assistive technologies', async () => {
      const { user } = await setup();

      await user.type(textBox(), 'trova la parola "cane" vicino alla');

      expect(textBox()).toHaveAccessibleDescription(
        expect.stringContaining('Continue with:'),
      );
    });
  });

  describe('search request', () => {
    it('should request a search for the query from the search button', async () => {
      const { user, searchRequest } = await setup();
      await user.type(textBox(), 'cane');
      await user.click(button('convert'));

      await user.click(button('search'));

      expect(searchRequest).toHaveBeenCalledTimes(1);
      expect(searchRequest).toHaveBeenCalledWith('[value="cane"]');
    });

    it('should request a search with Ctrl+Enter in the query', async () => {
      const { user, searchRequest } = await setup();
      await user.type(textBox(), 'cane');
      await user.click(button('convert'));

      await user.click(queryBox());
      await user.keyboard('{Control>}{Enter}{/Control}');

      expect(searchRequest).toHaveBeenCalledWith('[value="cane"]');
    });

    it('should request a search for an edited query', async () => {
      const { user, searchRequest } = await setup();
      await user.type(textBox(), 'cane');
      await user.click(button('convert'));

      await user.clear(queryBox());
      await user.type(queryBox(), '[[value="gatto"]');
      await user.click(button('search'));

      expect(searchRequest).toHaveBeenCalledWith('[value="gatto"]');
    });

    it('should request a search with Ctrl+T', async () => {
      const { user, searchRequest } = await setup();
      await user.type(textBox(), 'cane');
      await user.click(button('convert'));

      await user.keyboard('{Control>}t{/Control}');

      expect(searchRequest).toHaveBeenCalledWith('[value="cane"]');
    });

    it('should not request a search with Ctrl+T when there is no text', async () => {
      const { user, searchRequest } = await setup();

      await user.keyboard('{Control>}t{/Control}');

      expect(searchRequest).not.toHaveBeenCalled();
    });

    it('should not request a search with Ctrl+T when there is no query yet', async () => {
      const { user, searchRequest } = await setup();
      await user.type(textBox(), 'cane');

      await user.keyboard('{Control>}t{/Control}');

      expect(searchRequest).not.toHaveBeenCalled();
    });

    it('should not request a search with Ctrl+Enter when there is no query yet', async () => {
      const { user, searchRequest } = await setup();
      await user.type(textBox(), 'cane');

      await user.click(queryBox());
      await user.keyboard('{Control>}{Enter}{/Control}');

      expect(searchRequest).not.toHaveBeenCalled();
    });

    it('should not react to other keys', async () => {
      const { user, searchRequest } = await setup();
      await user.type(textBox(), 'cane');
      await user.click(button('convert'));
      await user.tab();

      await user.keyboard('t{Control>}x{/Control}');

      expect(searchRequest).not.toHaveBeenCalled();
    });
  });

  describe('query', () => {
    it('should let the user edit the query by default', async () => {
      await setup();

      expect(queryBox()).not.toHaveAttribute('readonly');
      expect(screen.getByText('Ctrl+Enter to search')).toBeInTheDocument();
    });

    it('should make the query readonly when requested', async () => {
      await setup({ readonlyQuery: true });

      expect(queryBox()).toHaveAttribute('readonly');
      expect(
        screen.queryByText('Ctrl+Enter to search'),
      ).not.toBeInTheDocument();
    });

    it('should still convert and search with a readonly query', async () => {
      const { user, searchRequest } = await setup({ readonlyQuery: true });

      await user.type(textBox(), 'cane');
      await user.click(button('convert'));
      await user.click(button('search'));

      expect(queryBox()).toHaveValue('[value="cane"]');
      expect(searchRequest).toHaveBeenCalledWith('[value="cane"]');
    });
  });

  describe('history', () => {
    async function setupWithHistory(...texts: string[]) {
      const view = await setup();
      for (const text of texts) {
        await view.user.clear(textBox());
        await view.user.type(textBox(), text);
        await view.user.click(button('convert'));
      }
      return view;
    }

    it('should list the most recent conversion first', async () => {
      await setupWithHistory('cane', 'gatto');

      expect(historyRows()).toEqual([
        ['gatto', '[value="gatto"]'],
        ['cane', '[value="cane"]'],
      ]);
    });

    it('should keep the 10 most recent conversions only', async () => {
      const texts = Array.from({ length: 11 }, (_, i) => `w${i}`);

      await setupWithHistory(...texts);

      const rows = historyRows();
      expect(rows).toHaveLength(10);
      expect(rows[0][0]).toBe('w10');
      expect(rows[9][0]).toBe('w1');
    });

    it('should restore text and query when picking an entry', async () => {
      const { user, searchRequest } = await setupWithHistory('cane', 'gatto');

      await user.click(
        screen.getAllByRole('button', { name: 'Pick this entry' })[1],
      );

      expect(textBox()).toHaveValue('cane');
      expect(queryBox()).toHaveValue('[value="cane"]');
      expect(searchRequest).not.toHaveBeenCalled();
    });

    it('should also request a search when picking an entry with autorun', async () => {
      const { user, searchRequest } = await setupWithHistory('cane', 'gatto');
      await user.click(autorun());

      await user.click(
        screen.getAllByRole('button', { name: 'Pick this entry' })[1],
      );

      expect(searchRequest).toHaveBeenCalledWith('[value="cane"]');
    });

    it('should remove an entry', async () => {
      const { user } = await setupWithHistory('cane', 'gatto');

      await user.click(
        screen.getAllByRole('button', { name: 'Remove this entry' })[0],
      );

      expect(historyRows()).toEqual([['cane', '[value="cane"]']]);
    });

    it('should hide the history once the last entry is removed', async () => {
      const { user } = await setupWithHistory('cane');

      await user.click(button('Remove this entry'));

      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('presets', () => {
    const GROUPED: PqitaPresetEntry[] = [
      { group: 'words', value: 'trova la parola "cane"' },
      { group: 'words', value: 'trova la parola "gatto"' },
      { group: 'lemmata', value: 'trova il lemma "andare"' },
    ];
    const presetBox = () => screen.getByRole('combobox', { name: 'preset' });
    const groupBox = () =>
      screen.getByRole('combobox', { name: 'preset group' });

    async function optionNames(
      user: ReturnType<typeof userEvent.setup>,
      combobox: HTMLElement,
    ): Promise<string[]> {
      await user.click(combobox);
      const names = (await screen.findAllByRole('option')).map(
        (o) => o.textContent?.trim() ?? '',
      );
      await user.keyboard('{Escape}');
      return names;
    }

    it('should offer no presets when there are none', async () => {
      await setup();

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('should offer the presets with no group choice when they share a group', async () => {
      const { user } = await setup({
        presets: [
          { group: '-', value: 'trova la parola "cane"' },
          { group: '-', value: 'trova il lemma "andare"' },
        ],
      });

      expect(screen.getAllByRole('combobox')).toHaveLength(1);
      expect(await optionNames(user, presetBox())).toEqual([
        'trova la parola "cane"',
        'trova il lemma "andare"',
      ]);
    });

    it('should offer the presets having no group', async () => {
      const { user } = await setup({
        presets: [
          { value: 'trova la parola "cane"' },
          { value: 'trova il lemma "andare"' },
        ],
      });

      expect(screen.getAllByRole('combobox')).toHaveLength(1);
      expect(await optionNames(user, presetBox())).toEqual([
        'trova la parola "cane"',
        'trova il lemma "andare"',
      ]);
    });

    it('should convert the picked preset', async () => {
      const { user } = await setup({
        presets: [{ group: '-', value: 'trova il lemma "andare"' }],
      });

      await selectOption(user, presetBox(), 'trova il lemma "andare"');

      expect(textBox()).toHaveValue('trova il lemma "andare"');
      expect(queryBox()).toHaveValue('[lemma="andare"]');
      expect(historyRows()).toEqual([]);
    });

    it('should initially offer the presets of the first group', async () => {
      const { user } = await setup({ presets: GROUPED });

      expect(screen.getAllByRole('combobox')).toHaveLength(2);
      await waitFor(() => expect(groupBox()).toHaveTextContent('words'));
      expect(await optionNames(user, presetBox())).toEqual([
        'trova la parola "cane"',
        'trova la parola "gatto"',
      ]);
    });

    it('should offer the presets of the picked group', async () => {
      const { user } = await setup({ presets: GROUPED });

      await selectOption(user, groupBox(), 'lemmata');

      // the group change is debounced
      await vi.waitFor(async () =>
        expect(await optionNames(user, presetBox())).toEqual([
          'trova il lemma "andare"',
        ]),
      );
    });

    it('should offer all the presets when picking no group', async () => {
      const { user } = await setup({ presets: GROUPED });

      await selectOption(user, groupBox(), '(all)');

      await vi.waitFor(async () =>
        expect(await optionNames(user, presetBox())).toHaveLength(3),
      );
    });

    it('should forget the picked preset when changing group', async () => {
      const { user } = await setup({ presets: GROUPED });
      await selectOption(user, presetBox(), 'trova la parola "gatto"');
      expect(presetBox()).toHaveTextContent('trova la parola "gatto"');

      await selectOption(user, groupBox(), 'lemmata');

      await waitFor(() =>
        expect(presetBox()).not.toHaveTextContent('trova la parola "gatto"'),
      );
    });
  });

  describe('speech recognition', () => {
    it('should offer no dictation when the browser does not support it', async () => {
      await setup();

      expect(
        screen.queryByRole('button', { name: 'Start listening' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Stop listening' }),
      ).not.toBeInTheDocument();
    });

    it('should ignore Ctrl+L when the browser does not support dictation', async () => {
      const { user } = await setup();

      await user.keyboard('{Control>}l{/Control}');

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('should offer to start listening when the browser supports it', async () => {
      await setup({ speech: true });

      expect(button('Start listening')).toBeEnabled();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('should listen from the start button', async () => {
      const { user, recognition } = await setup({ speech: true });

      await user.click(button('Start listening'));

      expect(recognition?.start).toHaveBeenCalledTimes(1);
      expect(await screen.findByRole('progressbar')).toBeInTheDocument();
      expect(button('Stop listening')).toBeEnabled();
      expect(
        screen.queryByRole('button', { name: 'Start listening' }),
      ).not.toBeInTheDocument();
    });

    it('should disable the other actions while listening', async () => {
      const { user } = await setup({ speech: true });
      await user.type(textBox(), 'cane');
      await user.click(button('convert'));

      await user.click(button('Start listening'));

      expect(button('clear')).toBeDisabled();
      expect(button('convert')).toBeDisabled();
      expect(button('search')).toBeDisabled();
      expect(button('Pick this entry')).toBeDisabled();
      expect(button('Remove this entry')).toBeDisabled();
    });

    it('should show the recognized text adding quotes to its values', async () => {
      const { user, recognition } = await setup({ speech: true });
      await user.click(button('Start listening'));

      recognition?.emitResults([speechResult('trova la parola cane')]);

      await waitFor(() =>
        expect(textBox()).toHaveValue('trova la parola "cane"'),
      );
    });

    it('should convert the recognized text when stopping', async () => {
      const { user, recognition, searchRequest } = await setup({
        speech: true,
      });
      await user.click(button('Start listening'));
      recognition?.emitResults([speechResult('trova la parola cane')]);
      await waitFor(() =>
        expect(textBox()).toHaveValue('trova la parola "cane"'),
      );

      await user.click(button('Stop listening'));

      expect(recognition?.stop).toHaveBeenCalledTimes(1);
      expect(queryBox()).toHaveValue('[value="cane"]');
      expect(historyRows()).toEqual([
        ['trova la parola "cane"', '[value="cane"]'],
      ]);
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(button('Start listening')).toBeEnabled();
      expect(searchRequest).not.toHaveBeenCalled();
    });

    it('should convert nothing when stopping before any text is recognized', async () => {
      const { user } = await setup({ speech: true });
      await user.click(button('Start listening'));

      await user.click(button('Stop listening'));

      expect(queryBox()).toHaveValue('');
      expect(historyRows()).toEqual([]);
    });

    it('should also request a search when stopping with autorun', async () => {
      const { user, recognition, searchRequest } = await setup({
        speech: true,
      });
      await user.click(autorun());
      await user.click(button('Start listening'));
      recognition?.emitResults([speechResult('trova la parola cane')]);
      await waitFor(() =>
        expect(textBox()).toHaveValue('trova la parola "cane"'),
      );

      await user.click(button('Stop listening'));

      expect(searchRequest).toHaveBeenCalledTimes(1);
      expect(searchRequest).toHaveBeenCalledWith('[value="cane"]');
    });

    it('should stop by itself 3 seconds after the last speech with autorun', async () => {
      const { user, recognition, searchRequest } = await setup({
        speech: true,
      });
      await user.click(autorun());
      // setInterval drives both the listening timeout and RxJS timers
      vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] });
      await user.click(button('Start listening'));
      recognition?.emitResults([speechResult('trova la parola cane')]);
      vi.advanceTimersByTime(100);
      await waitFor(() =>
        expect(textBox()).toHaveValue('trova la parola "cane"'),
      );

      vi.advanceTimersByTime(2500);
      expect(searchRequest).not.toHaveBeenCalled();
      vi.advanceTimersByTime(500);

      expect(recognition?.stop).toHaveBeenCalledTimes(1);
      expect(searchRequest).toHaveBeenCalledWith('[value="cane"]');
    });

    it('should keep listening until stopped without autorun', async () => {
      const { user, recognition } = await setup({ speech: true });
      vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] });
      await user.click(button('Start listening'));
      recognition?.emitResults([speechResult('trova la parola cane')]);

      vi.advanceTimersByTime(60_000);

      expect(recognition?.stop).not.toHaveBeenCalled();
    });

    it('should convert the recognized text when the browser stops listening by itself', async () => {
      const { user, recognition } = await setup({ speech: true });
      await user.click(button('Start listening'));
      recognition?.emitResults([speechResult('trova la parola cane')]);
      await waitFor(() =>
        expect(textBox()).toHaveValue('trova la parola "cane"'),
      );

      recognition?.emitEnd();

      await waitFor(() => expect(button('Start listening')).toBeEnabled());
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(queryBox()).toHaveValue('[value="cane"]');
      expect(historyRows()).toEqual([
        ['trova la parola "cane"', '[value="cane"]'],
      ]);
    });

    it('should toggle listening with Ctrl+L', async () => {
      const { user, recognition } = await setup({ speech: true });

      await user.keyboard('{Control>}l{/Control}');
      expect(recognition?.start).toHaveBeenCalledTimes(1);
      expect(await screen.findByRole('progressbar')).toBeInTheDocument();

      await user.keyboard('{Control>}l{/Control}');
      expect(recognition?.stop).toHaveBeenCalledTimes(1);
      await waitFor(() =>
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(),
      );
    });
  });
});
