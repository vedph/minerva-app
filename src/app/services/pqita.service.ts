import { Injectable } from '@angular/core';

import {
  CharStream,
  CharStreams,
  CommonTokenStream,
  ParseTreeWalker,
} from 'antlr4';

import PqitaLexer from './pqita.lexer';
import PqitaParser from './pqita.parser';
import PqitaListener from './pqita.listener';

@Injectable({
  providedIn: 'root',
})
export class PqitaService {
  // regex used to supply quotes - item, operator, value
  private readonly _valueRegex =
    /(?<item>parola|locuzione|lemma|forestierismo|latinismo|anglicismo)\s+(?:(?<operator>uguale a|iniziante per|terminante per|contenente|corrispondente a|(?:molto |poco )?simile a)\s+)?(?<value>(?:(?!parola|locuzione|lemma|forestierismo|latinismo|anglicismo|come|in|a inizio|a fine|vicino|attaccato|prima|dopo|uguale a|iniziante per|terminante per|contenente|corrispondente a|simile a)\S+\s*)+)/g;

  public convertQuery(inputText: string): string {
    // corner cases: empty
    if (!inputText) {
      return '';
    }

    // lowercase
    inputText = inputText.toLowerCase();

    // a text with no inner space is just a single word query
    let value = inputText.trim();
    if (!value.includes(' ')) {
      // if the text is wrapped in "", remove quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      // convert into simple query
      return `[value="${value}"]`;
    }

    // create the lexer and parser
    const charStream: CharStream = CharStreams.fromString(inputText);
    const lexer = new PqitaLexer(charStream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PqitaParser(tokens);

    // parse the input
    const tree = parser.expression();

    // create and setup the listener
    const listener = new PqitaListener();

    // walk the tree with our listener
    ParseTreeWalker.DEFAULT.walk(listener, tree);

    // get the result
    return listener.getResult();
  }

  /**
   * Supply quotes to each value in the given Pythia Italian query text.
   *
   * @param text The text to supply quotes to.
   * @returns The text with each value surrounded by quotes.
   */
  public supplyQuotes(text: string): string {
    const supplied = text.replace(
      this._valueRegex,
      (match, item, operator, value) => {
        if (operator) {
          return `${item} ${operator} "${value.trim()}" `;
        } else {
          return `${item} "${value.trim()}" `;
        }
      }
    );
    // normalize WS
    return supplied.replace(/\s+/g, ' ').trim();
  }
}
