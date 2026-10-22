import { Injectable } from '@angular/core';

import {
  CharStreams,
  CommonTokenStream,
  ErrorListener,
  Recognizer,
  Token,
} from 'antlr4';

import PqitaLexer from './pqita.lexer';
import PqitaParser, { ExpressionContext } from './pqita.parser';
import {
  DEFAULT_PQITA_TRANSLATOR_OPTIONS,
  PqitaTranslationError,
  PqitaTranslator,
} from './pqita.translator';

//#region constants
// 0020-024F
const r1: number[] = [
  0x0020, 0x0021, 0x0022, 0x0023, 0x0024, 0x0025, 0x0026, 0x0027, 0x0028,
  0x0029, 0x002a, 0x002b, 0x002c, 0x002d, 0x002e, 0x002f, 0x0030, 0x0031,
  0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039, 0x003a,
  0x003b, 0x003c, 0x003d, 0x003e, 0x003f, 0x0040, 0x0041, 0x0042, 0x0043,
  0x0044, 0x0045, 0x0046, 0x0047, 0x0048, 0x0049, 0x004a, 0x004b, 0x004c,
  0x004d, 0x004e, 0x004f, 0x0050, 0x0051, 0x0052, 0x0053, 0x0054, 0x0055,
  0x0056, 0x0057, 0x0058, 0x0059, 0x005a, 0x005b, 0x005c, 0x005d, 0x005e,
  0x005f, 0x0060, 0x0061, 0x0062, 0x0063, 0x0064, 0x0065, 0x0066, 0x0067,
  0x0068, 0x0069, 0x006a, 0x006b, 0x006c, 0x006d, 0x006e, 0x006f, 0x0070,
  0x0071, 0x0072, 0x0073, 0x0074, 0x0075, 0x0076, 0x0077, 0x0078, 0x0079,
  0x007a, 0x007b, 0x007c, 0x007d, 0x007e, 0x007f, 0x0080, 0x0081, 0x0082,
  0x0083, 0x0084, 0x0085, 0x0086, 0x0087, 0x0088, 0x0089, 0x008a, 0x008b,
  0x008c, 0x008d, 0x008e, 0x008f, 0x0090, 0x0091, 0x0092, 0x0093, 0x0094,
  0x0095, 0x0096, 0x0097, 0x0098, 0x0099, 0x009a, 0x009b, 0x009c, 0x009d,
  0x009e, 0x009f, 0x00a0, 0x00a1, 0x00a2, 0x00a3, 0x00a4, 0x00a5, 0x00a6,
  0x00a7, 0x00a8, 0x00a9, 0x00aa, 0x00ab, 0x00ac, 0x00ad, 0x00ae, 0x00af,
  0x00b0, 0x00b1, 0x00b2, 0x00b3, 0x00b4, 0x00b5, 0x00b6, 0x00b7, 0x00b8,
  0x00b9, 0x00ba, 0x00bb, 0x00bc, 0x00bd, 0x00be, 0x00bf, 0x0041, 0x0041,
  0x0041, 0x0041, 0x0041, 0x0041, 0x00c6, 0x0043, 0x0045, 0x0045, 0x0045,
  0x0045, 0x0049, 0x0049, 0x0049, 0x0049, 0x00d0, 0x004e, 0x004f, 0x004f,
  0x004f, 0x004f, 0x004f, 0x00d7, 0x00d8, 0x0055, 0x0055, 0x0055, 0x0055,
  0x0059, 0x00de, 0x00df, 0x0061, 0x0061, 0x0061, 0x0061, 0x0061, 0x0061,
  0x00e6, 0x0063, 0x0065, 0x0065, 0x0065, 0x0065, 0x0069, 0x0069, 0x0069,
  0x0069, 0x00f0, 0x006e, 0x006f, 0x006f, 0x006f, 0x006f, 0x006f, 0x00f7,
  0x00f8, 0x0075, 0x0075, 0x0075, 0x0075, 0x0079, 0x00fe, 0x0079, 0x0041,
  0x0061, 0x0041, 0x0061, 0x0041, 0x0061, 0x0043, 0x0063, 0x0043, 0x0063,
  0x0043, 0x0063, 0x0043, 0x0063, 0x0044, 0x0064, 0x0110, 0x0111, 0x0045,
  0x0065, 0x0045, 0x0065, 0x0045, 0x0065, 0x0045, 0x0065, 0x0045, 0x0065,
  0x0047, 0x0067, 0x0047, 0x0067, 0x0047, 0x0067, 0x0047, 0x0067, 0x0048,
  0x0068, 0x0126, 0x0127, 0x0049, 0x0069, 0x0049, 0x0069, 0x0049, 0x0069,
  0x0049, 0x0069, 0x0049, 0x0131, 0x0132, 0x0133, 0x004a, 0x006a, 0x004b,
  0x006b, 0x0138, 0x004c, 0x006c, 0x004c, 0x006c, 0x004c, 0x006c, 0x013f,
  0x0140, 0x0141, 0x0142, 0x004e, 0x006e, 0x004e, 0x006e, 0x004e, 0x006e,
  0x0149, 0x014a, 0x014b, 0x004f, 0x006f, 0x004f, 0x006f, 0x004f, 0x006f,
  0x0152, 0x0153, 0x0052, 0x0072, 0x0052, 0x0072, 0x0052, 0x0072, 0x0053,
  0x0073, 0x0053, 0x0073, 0x0053, 0x0073, 0x0053, 0x0073, 0x0054, 0x0074,
  0x0054, 0x0074, 0x0166, 0x0167, 0x0055, 0x0075, 0x0055, 0x0075, 0x0055,
  0x0075, 0x0055, 0x0075, 0x0055, 0x0075, 0x0055, 0x0075, 0x0057, 0x0077,
  0x0059, 0x0079, 0x0059, 0x005a, 0x007a, 0x005a, 0x007a, 0x005a, 0x007a,
  0x017f, 0x0180, 0x0181, 0x0182, 0x0183, 0x0184, 0x0185, 0x0186, 0x0187,
  0x0188, 0x0189, 0x018a, 0x018b, 0x018c, 0x018d, 0x018e, 0x018f, 0x0190,
  0x0191, 0x0192, 0x0193, 0x0194, 0x0195, 0x0196, 0x0197, 0x0198, 0x0199,
  0x019a, 0x019b, 0x019c, 0x019d, 0x019e, 0x019f, 0x004f, 0x006f, 0x01a2,
  0x01a3, 0x01a4, 0x01a5, 0x01a6, 0x01a7, 0x01a8, 0x01a9, 0x01aa, 0x01ab,
  0x01ac, 0x01ad, 0x01ae, 0x0055, 0x0075, 0x01b1, 0x01b2, 0x01b3, 0x01b4,
  0x01b5, 0x01b6, 0x01b7, 0x01b8, 0x01b9, 0x01ba, 0x01bb, 0x01bc, 0x01bd,
  0x01be, 0x01bf, 0x01c0, 0x01c1, 0x01c2, 0x01c3, 0x01c4, 0x01c5, 0x01c6,
  0x01c7, 0x01c8, 0x01c9, 0x01ca, 0x01cb, 0x01cc, 0x0041, 0x0061, 0x0049,
  0x0069, 0x004f, 0x006f, 0x0055, 0x0075, 0x0055, 0x0075, 0x0055, 0x0075,
  0x0055, 0x0075, 0x0055, 0x0075, 0x01dd, 0x0041, 0x0061, 0x0041, 0x0061,
  0x00c6, 0x00e6, 0x01e4, 0x01e5, 0x0047, 0x0067, 0x004b, 0x006b, 0x004f,
  0x006f, 0x004f, 0x006f, 0x01b7, 0x0292, 0x006a, 0x01f1, 0x01f2, 0x01f3,
  0x0047, 0x0067, 0x01f6, 0x01f7, 0x004e, 0x006e, 0x0041, 0x0061, 0x00c6,
  0x00e6, 0x00d8, 0x00f8, 0x0041, 0x0061, 0x0041, 0x0061, 0x0045, 0x0065,
  0x0045, 0x0065, 0x0049, 0x0069, 0x0049, 0x0069, 0x004f, 0x006f, 0x004f,
  0x006f, 0x0052, 0x0072, 0x0052, 0x0072, 0x0055, 0x0075, 0x0055, 0x0075,
  0x0053, 0x0073, 0x0054, 0x0074, 0x021c, 0x021d, 0x0048, 0x0068, 0x0220,
  0x0221, 0x0222, 0x0223, 0x0224, 0x0225, 0x0041, 0x0061, 0x0045, 0x0065,
  0x004f, 0x006f, 0x004f, 0x006f, 0x004f, 0x006f, 0x004f, 0x006f, 0x0059,
  0x0079, 0x0234, 0x0235, 0x0236, 0x0237, 0x0238, 0x0239, 0x023a, 0x023b,
  0x023c, 0x023d, 0x023e, 0x023f, 0x0240, 0x0241, 0x0242, 0x0243, 0x0244,
  0x0245, 0x0246, 0x0247, 0x0248, 0x0249, 0x024a, 0x024b, 0x024c, 0x024d,
  0x024e, 0x024f,
];
//#endregion

/**
 * Something which can follow a pqita text: either a pqita keyword,
 * or the description of a class of words.
 */
export interface PqitaSuggestion {
  text: string;
  keyword: boolean;
}

/**
 * An issue in a pqita text.
 */
export interface PqitaIssue {
  /**
   * The localized message for users.
   */
  message: string;
  /**
   * The offset of the offending text in the input.
   */
  start: number;
  /**
   * The offset past the end of the offending text in the input.
   */
  end: number;
  /**
   * What would be accepted at the start of the offending text.
   */
  expected: PqitaSuggestion[];
}

/**
 * The status of a pqita text: empty; a single word, searched as such;
 * a complete sentence; a valid start of a sentence; or an invalid text.
 */
export type PqitaStatus = 'empty' | 'word' | 'complete' | 'incomplete' | 'error';

/**
 * The result of analyzing a pqita text.
 */
export interface PqitaAnalysis {
  status: PqitaStatus;
  /**
   * The Pythia query, when status is word or complete.
   */
  query?: string;
  /**
   * The issue, when status is incomplete or error.
   */
  error?: PqitaIssue;
  /**
   * What can follow the text, when status is not error.
   */
  next: PqitaSuggestion[];
}

/**
 * Error thrown when converting an invalid pqita text.
 */
export class PqitaError extends Error {
  constructor(public readonly issue: PqitaIssue) {
    super(issue.message);
  }
}

/**
 * A pqita token type, with a sample text used to probe the parser
 * and the words to suggest to users.
 */
interface PqitaTokenInfo {
  type: number;
  sample: string;
  words: string[];
  /**
   * The description to suggest instead of the words, when these are
   * too many.
   */
  description?: string;
  /**
   * True to suggest words only to complete a partially typed word.
   */
  hidden?: boolean;
}

const TOKEN_INFOS: PqitaTokenInfo[] = [
  { type: PqitaParser.VERB, sample: 'trova', words: ['trova', 'cerca'] },
  {
    type: PqitaParser.ARTICLE,
    sample: 'la',
    words: ['il', 'lo', 'la', "l'", 'un', 'uno', 'una', "un'"],
    hidden: true,
  },
  {
    type: PqitaParser.PLURAL_ARTICLE,
    sample: 'le',
    words: ['i', 'gli', 'le'],
    hidden: true,
  },
  {
    type: PqitaParser.QUANTIFIER,
    sample: 'tutte',
    words: ['tutte', 'tutti'],
  },
  { type: PqitaParser.WORD, sample: 'parola', words: ['parola'] },
  { type: PqitaParser.LEMMA, sample: 'lemma', words: ['lemma'] },
  { type: PqitaParser.LOCUTION, sample: 'locuzione', words: ['locuzione'] },
  {
    type: PqitaParser.FOREIGN,
    sample: 'latinismo',
    words: ['forestierismo', 'anglicismo', 'latinismo'],
  },
  { type: PqitaParser.WORDS, sample: 'parole', words: ['parole'] },
  { type: PqitaParser.LOCUTIONS, sample: 'locuzioni', words: ['locuzioni'] },
  {
    type: PqitaParser.FOREIGNS,
    sample: 'latinismi',
    words: ['forestierismi', 'anglicismi', 'latinismi'],
  },
  { type: PqitaParser.EQ_OP, sample: 'uguale a', words: ['uguale a'] },
  {
    type: PqitaParser.STARTS_OP,
    sample: 'iniziante per',
    words: ['iniziante per'],
  },
  {
    type: PqitaParser.ENDS_OP,
    sample: 'terminante per',
    words: ['terminante per'],
  },
  { type: PqitaParser.CONTAINS_OP, sample: 'contenente', words: ['contenente'] },
  {
    type: PqitaParser.WILDCARDS_OP,
    sample: 'corrispondente a',
    words: ['corrispondente a'],
  },
  { type: PqitaParser.DEGREE, sample: 'molto', words: ['molto', 'poco'] },
  { type: PqitaParser.SIMILAR_OP, sample: 'simile a', words: ['simile a'] },
  {
    type: PqitaParser.VALUE,
    sample: '"x"',
    words: [],
    description: $localize`:@@pqita.valueHint:the text to find between double quotes, e.g. "casa"`,
  },
  { type: PqitaParser.COME, sample: 'come', words: ['come'] },
  {
    type: PqitaParser.POS_TYPE,
    sample: 'aggettivo',
    words: Object.keys(DEFAULT_PQITA_TRANSLATOR_OPTIONS.posMap),
    description: $localize`:@@pqita.posHint:a grammatical feature, e.g. aggettivo, sostantivo, verbo, plurale`,
  },
  {
    type: PqitaParser.STYLE_TYPE,
    sample: 'in corsivo',
    words: ['in grassetto', 'in corsivo', 'in sottolineato'],
  },
  { type: PqitaParser.NEGATION, sample: 'non', words: ['non'] },
  {
    type: PqitaParser.LOC_START,
    sample: 'a inizio di frase',
    words: ['a inizio di frase'],
  },
  {
    type: PqitaParser.LOC_END,
    sample: 'a fine di frase',
    words: ['a fine di frase'],
  },
  { type: PqitaParser.NEAR_OP, sample: 'vicino a', words: ['vicino a'] },
  {
    type: PqitaParser.ATTACHED_OP,
    sample: 'attaccato a',
    words: ['attaccato a'],
  },
  { type: PqitaParser.BEFORE_OP, sample: 'prima di', words: ['prima di'] },
  { type: PqitaParser.AFTER_OP, sample: 'dopo', words: ['dopo'] },
];

/**
 * The tokens which can follow a pqita text.
 */
interface PqitaExpectation {
  infos: PqitaTokenInfo[];
  /**
   * True if the text is a complete sentence.
   */
  canEnd: boolean;
}

class FirstErrorListener extends ErrorListener<Token> {
  public token?: Token;

  override syntaxError(
    _recognizer: Recognizer<Token>,
    offendingSymbol: Token,
  ): void {
    this.token ??= offendingSymbol;
  }
}

/**
 * Service to convert pqita texts (Pythia Query in ITAlian) into Pythia
 * queries, and to help users in writing them.
 */
@Injectable({
  providedIn: 'root',
})
export class PqitaService {
  // regex used to supply quotes - item, operator, value; the value is
  // any sequence of words not starting with a pqita keyword
  private readonly _valueRegex =
    /\b(?<item>parola|locuzione|lemma|forestierismo|latinismo|anglicismo)\s+(?:(?<operator>uguale a|iniziante (?:per|con)|terminante (?:per|con|in)|contenente|corrispondente a|(?:molto |poco )?simile a)\s+)?(?<value>(?:(?!(?:parola|parole|locuzione|lemma|forestierismo|latinismo|anglicismo|come|in|a inizio|a fine|all'inizio|alla fine|vicino|attaccat[oaie]|prima|dopo|non|uguale a|iniziante|terminante|contenente|corrispondente a|(?:molto |poco )?simile a)\b)\S+\s*)+)/g;

  private readonly _translator = new PqitaTranslator();

  /**
   * Convert the given text into segments.
   *
   * @param text The text to convert into segments.
   * @returns The converted text.
   */
  public convertToSegments(text?: string): string {
    if (!text) {
      return '';
    }

    return text
      .split('')
      .map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 0x0020 && code <= 0x024f) {
          return String.fromCharCode(r1[code - 0x0020]);
        } else {
          return c;
        }
      })
      .join('');
  }

  /**
   * Normalize the text for parsing, preserving the offset of each
   * character: lowercase, segments, plain quotes and apostrophes,
   * no final punctuation.
   */
  private normalize(text: string): string {
    return this.convertToSegments(text.toLowerCase())
      .replace(/[“”«»„]/g, '"')
      .replace(/[‘’`´]/g, "'")
      .replace(/[.!]+(?=\s*$)/, (m) => ' '.repeat(m.length));
  }

  private parse(input: string): {
    tree: ExpressionContext;
    error?: Token;
  } {
    const lexer = new PqitaLexer(CharStreams.fromString(input));
    // the lexer has no errors, as it has catch-all error tokens
    lexer.removeErrorListeners();
    const parser = new PqitaParser(new CommonTokenStream(lexer));
    parser.removeErrorListeners();
    const listener = new FirstErrorListener();
    parser.addErrorListener(listener);

    const tree = parser.expression();
    return { tree, error: listener.token };
  }

  /**
   * True if the input is the start of a valid sentence, complete or not.
   */
  private isValidPrefix(input: string): boolean {
    // parse with an unacceptable final token: the input is valid if
    // the first error is on that token
    const end = input.length + 1;
    const { error } = this.parse(input + ' §');
    return !!error && error.start >= end;
  }

  /**
   * Get the tokens which can follow the specified valid input.
   */
  private getExpectation(input: string): PqitaExpectation {
    return {
      infos: TOKEN_INFOS.filter((info) =>
        this.isValidPrefix(`${input} ${info.sample}`),
      ),
      canEnd: !this.parse(input).error,
    };
  }

  private static toSuggestions(infos: PqitaTokenInfo[]): PqitaSuggestion[] {
    return infos
      .filter((info) => !info.hidden)
      .flatMap<PqitaSuggestion>((info) =>
        info.description
          ? [{ text: info.description, keyword: false }]
          : info.words.map((text) => ({ text, keyword: true })),
      );
  }

  /**
   * Get the words which complete a partially typed text.
   */
  private static complete(
    infos: PqitaTokenInfo[],
    partial: string,
  ): PqitaSuggestion[] {
    const words = infos
      .flatMap((info) => info.words)
      .filter((word) => word.startsWith(partial));
    return [...new Set(words)].map((text) => ({ text, keyword: true }));
  }

  private buildIssue(input: string, token: Token): PqitaIssue {
    const expectation = this.getExpectation(input.slice(0, token.start));
    const expected = PqitaService.toSuggestions(expectation.infos);
    if (expectation.canEnd) {
      expected.push({
        text: $localize`:@@pqita.endHint:the end of the sentence`,
        keyword: false,
      });
    }
    const types = new Set(expectation.infos.map((info) => info.type));
    const text = token.text;
    let message: string;

    switch (token.type) {
      case Token.EOF:
        message = $localize`:@@pqita.incomplete:The sentence is incomplete.`;
        break;
      case PqitaParser.UNCLOSED_VALUE:
        message = $localize`:@@pqita.unclosedValue:The closing double quote is missing.`;
        break;
      case PqitaParser.UNKNOWN:
        message = types.has(PqitaParser.VALUE)
          ? $localize`:@@pqita.unquotedValue:Put the text to find between double quotes: "${text}:TEXT:".`
          : $localize`:@@pqita.unknownWord:Unknown word: "${text}:TEXT:".`;
        break;
      case PqitaParser.ERROR_CHAR:
        message = $localize`:@@pqita.unexpectedChar:Unexpected character: "${text}:TEXT:".`;
        break;
      case PqitaParser.VALUE:
        message = types.has(PqitaParser.WORD)
          ? $localize`:@@pqita.valueWithoutItem:Before the text between quotes, say what to find, e.g. parola ${text}:TEXT:.`
          : $localize`:@@pqita.unexpectedValue:The text ${text}:TEXT: is not expected here.`;
        break;
      default:
        message = $localize`:@@pqita.unexpectedWord:"${text}:TEXT:" is not expected here.`;
        break;
    }

    return {
      message,
      start: token.start,
      end: token.type === Token.EOF ? token.start : token.stop + 1,
      expected,
    };
  }

  private analyzeWord(input: string): PqitaAnalysis {
    const word = input.trim();
    const value = word.replace(/"/g, '');
    if (!value) {
      return { status: 'empty', next: [] };
    }
    const next = this.isValidPrefix(word)
      ? PqitaService.toSuggestions(this.getExpectation(word).infos)
      : PqitaService.complete(this.getExpectation('').infos, word);
    return { status: 'word', query: `[value="${value}"]`, next };
  }

  /**
   * Analyze the specified pqita text, getting its translation, or its
   * first issue, and what may follow it.
   *
   * @param text The text to analyze.
   * @returns The analysis.
   */
  public analyze(text: string): PqitaAnalysis {
    const input = this.normalize(text ?? '');
    if (!input.trim()) {
      return {
        status: 'empty',
        next: PqitaService.toSuggestions(this.getExpectation('').infos),
      };
    }

    // a text with no inner space is just a single word query
    if (!/\s/.test(input.trim())) {
      return this.analyzeWord(input);
    }

    const { tree, error } = this.parse(input);

    // complete
    if (!error) {
      try {
        return {
          status: 'complete',
          query: this._translator.translate(tree),
          next: PqitaService.toSuggestions(this.getExpectation(input).infos),
        };
      } catch (e) {
        if (e instanceof PqitaTranslationError) {
          return {
            status: 'error',
            error: {
              message: e.message,
              start: e.token.start,
              end: e.token.stop + 1,
              expected: [],
            },
            next: [],
          };
        }
        throw e;
      }
    }

    // incomplete
    if (error.type === Token.EOF) {
      const issue = this.buildIssue(input, error);
      return { status: 'incomplete', error: issue, next: issue.expected };
    }

    // incomplete with a partially typed final word or words
    const partial = input.slice(error.start).trim().replace(/\s+/g, ' ');
    if (!partial.includes('"')) {
      const prefix = input.slice(0, error.start);
      const next = PqitaService.complete(
        this.getExpectation(prefix).infos,
        partial,
      );
      if (next.length) {
        return {
          status: 'incomplete',
          error: {
            message: $localize`:@@pqita.incomplete:The sentence is incomplete.`,
            start: error.start,
            end: input.trimEnd().length,
            expected: next,
          },
          next,
        };
      }
    }

    return { status: 'error', error: this.buildIssue(input, error), next: [] };
  }

  /**
   * Convert the specified pqita text into a Pythia query.
   *
   * @param inputText The text to convert.
   * @returns The Pythia query, or an empty string if the text is empty.
   * @throws PqitaError if the text is not valid.
   */
  public convertQuery(inputText: string): string {
    const analysis = this.analyze(inputText);
    if (analysis.status === 'incomplete' || analysis.status === 'error') {
      throw new PqitaError(analysis.error!);
    }
    return analysis.query ?? '';
  }

  /**
   * Supply quotes to each value in the given Pythia Italian query text.
   *
   * @param text The text to supply quotes to.
   * @returns The text with each value surrounded by quotes.
   */
  public supplyQuotes(text: string): string {
    const supplied = text
      .trim()
      .replace(/[.!]+$/, '')
      .replace(this._valueRegex, (match, item, operator, value) => {
        if (operator) {
          return `${item} ${operator} "${value.trim()}" `;
        } else {
          return `${item} "${value.trim()}" `;
        }
      });
    // normalize WS
    return supplied.replace(/\s+/g, ' ').trim();
  }
}
