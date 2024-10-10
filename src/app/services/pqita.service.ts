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
  constructor() {}

  public convertQuery(inputText: string): string {
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
}
