// Generated from pqita.g4 by ANTLR 4.13.2

import { ParseTreeListener } from 'antlr4';

import { ExpressionContext } from './pqita.parser.js';
import { VerbContext } from './pqita.parser.js';
import { ItemOrSetContext } from './pqita.parser.js';
import { ItemContext } from './pqita.parser.js';
import { ItemContinuationContext } from './pqita.parser.js';
import { SetContext } from './pqita.parser.js';
import { OperatorContext } from './pqita.parser.js';
import { SimilarityContext } from './pqita.parser.js';
import { DegreeContext } from './pqita.parser.js';
import { ArticleContext } from './pqita.parser.js';
import { QuantifierContext } from './pqita.parser.js';
import { PosTagContext } from './pqita.parser.js';
import { StyleTagContext } from './pqita.parser.js';
import { LocationOrRelationContext } from './pqita.parser.js';
import { LocationContext } from './pqita.parser.js';
import { RelationContext } from './pqita.parser.js';
import { RecursiveExpressionContext } from './pqita.parser.js';
import { NegationContext } from './pqita.parser.js';

/**
 * Options for the PqitaListener.
 */
export interface PqitaListenerOptions {
  lowSimilarityThreshold: number;
  similarityThreshold: number;
  highSimilarityThreshold: number;
  proximityThreshold: number;
  posMap: { [key: string]: string };
}

const DEFAULT_LISTENER_OPTIONS: PqitaListenerOptions = {
  lowSimilarityThreshold: 0.5,
  similarityThreshold: 0.8,
  highSimilarityThreshold: 0.9,
  proximityThreshold: 3,
  posMap: {
    // pos
    aggettivo: 'ADJ',
    apposizione: 'ADP',
    avverbio: 'ADV',
    ausiliare: 'AUX',
    'congiunzione coordinante': 'CCONJ',
    determinante: 'DET',
    sostantivo: 'NOUN',
    numero: 'NUM',
    pronome: 'PRON',
    'nome proprio': 'PROPN',
    'congiunzione subordinante': 'SCONJ',
    simbolo: 'SYM',
    verbo: 'VERB',
    altro: 'X',
    // verbform
    infinito: 'verbform=inf',
    gerundio: 'verbform=ger',
    participio: 'verbform=part',
    // mood
    indicativo: 'mood=ind',
    congiuntivo: 'mood=sub',
    condizionale: 'mood=cnd',
    imperativo: 'mood=imp',
    // definite
    'modo definito': 'definite=def',
    'modo indefinito': 'definite=ind',
    // tense
    presente: 'tense=pres',
    passato: 'tense=past',
    futuro: 'tense=fut',
    // person
    'prima persona': 'person=1',
    'seconda persona': 'person=2',
    'terza persona': 'person=3',
    // number
    singolare: 'number=sing',
    plurale: 'number=plur',
    // gender
    maschile: 'gender=masc',
    femminile: 'gender=fem',
    // clitic
    clitica: 'clitic=yes',
    // poss
    possessivo: 'poss=yes',
    // prontype
    articolo: 'prontype=art',
    'pronome dimostrativo': 'prontype=dem',
    'pronome indefinito': 'prontype=ind',
    'pronome interrogativo': 'prontype=int',
    'pronome negativo': 'prontype=neg',
    'pronome personale': 'prontype=prs',
    'pronome relativo': 'prontype=rel',
    'pronome totalizzante': 'prontype=tot',
    // degree
    comparativo: 'degree=cmp',
    superlativo: 'degree=abs',
  },
};

/**
 * This interface defines a complete listener for a parse tree produced by
 * `PqitaParser`.
 */
export default class PqitaListener extends ParseTreeListener {
  private _output: string = '';
  private _noAnd: boolean = false;

  constructor(
    private _options: PqitaListenerOptions = DEFAULT_LISTENER_OPTIONS
  ) {
    super();
  }

  private appendPair(pair: string, and?: boolean): void {
    if (and && !this._noAnd) {
      this._output += ' AND ';
    }
    this._output += pair;
    this._noAnd = false;
  }

  private handleOperatorValue(
    item: string,
    operator: string | undefined,
    value: string
  ): string {
    const cleanValue = value.replace(/^"|"$/g, '');

    // locuzione: $fp-lat AND _value=VALUE
    // lemma: lemma=VALUE
    // forestierismo: language<>"ita" AND value=VALUE
    // anglicismo: language="eng" AND value=VALUE
    // latinismo: language="lat" AND value=VALUE
    const sb: string[] = [];
    switch (item) {
      case 'locuzione':
        sb.push('[$fp-lat] AND [_value');
        break;
      case 'lemma':
        sb.push('[lemma');
        break;
      case 'forestierismo':
        sb.push('[language<>"ita"] AND [value');
        break;
      case 'anglicismo':
        sb.push('[language="eng"] AND [value');
        break;
      case 'latinismo':
        sb.push('[language="lat"] AND [value');
        break;
      default:
        sb.push('[value');
        break;
    }

    switch (operator?.trim()) {
      case 'uguale a':
        sb.push(`="${cleanValue}"]`);
        break;
      case 'iniziante per':
        sb.push(`^="${cleanValue}"]`);
        break;
      case 'terminante per':
        sb.push(`$="${cleanValue}"]`);
        break;
      case 'contenente':
        sb.push(`*="${cleanValue}"]`);
        break;
      case 'corrispondente a':
        sb.push(`?="${cleanValue}"]`);
        break;
      case 'pocosimile a':
        sb.push(`%="${cleanValue}:${this._options.lowSimilarityThreshold}"]`);
        break;
      case 'simile a':
        sb.push(`%="${cleanValue}:${this._options.similarityThreshold}"]`);
        break;
      case 'moltosimile a':
        sb.push(`%="${cleanValue}:${this._options.highSimilarityThreshold}"]`);
        break;
      default:
        sb.push(`="${cleanValue}"]`);
        break;
    }

    return sb.join('');
  }

  public getResult(): string {
    return this._output.trim();
  }

  /**
   * Enter a parse tree produced by `pqitaParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.verb`.
   * @param ctx the parse tree
   */
  enterVerb?: (ctx: VerbContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.verb`.
   * @param ctx the parse tree
   */
  exitVerb?: (ctx: VerbContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.itemOrSet`.
   * @param ctx the parse tree
   */
  enterItemOrSet?: (ctx: ItemOrSetContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.itemOrSet`.
   * @param ctx the parse tree
   */
  exitItemOrSet?: (ctx: ItemOrSetContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.item`.
   * @param ctx the parse tree
   */
  enterItem?: (ctx: ItemContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.item`.
   * @param ctx the parse tree
   */
  exitItem?(ctx: ItemContext): void {
    const symbol = ctx.ITEM().symbol.text;
    const continuation = ctx.itemContinuation();
    const operator = continuation.operator()?.getText();
    const value = continuation.VALUE().getText();
    const pair = this.handleOperatorValue(symbol, operator, value);
    this.appendPair(pair);
  }
  /**
   * Enter a parse tree produced by `pqitaParser.itemContinuation`.
   * @param ctx the parse tree
   */
  enterItemContinuation?: (ctx: ItemContinuationContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.itemContinuation`.
   * @param ctx the parse tree
   */
  exitItemContinuation?: (ctx: ItemContinuationContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.set`.
   * @param ctx the parse tree
   */
  enterSet?: (ctx: SetContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.set`.
   * @param ctx the parse tree
   */
  exitSet?(ctx: SetContext): void {
    const setType = ctx.SET_TYPE().getText().trim();
    let pair = '';

    if (setType.includes('forestierismi')) {
      pair = '[language<>"ita"]';
    } else if (setType.includes('anglicismi')) {
      pair = '[language="eng"]';
    } else if (setType.includes('latinismi')) {
      pair = '[language="lat"]';
    } else {
      // no output for 'parole'
      this._noAnd = true;
    }

    if (pair) {
      this.appendPair(pair);
    }
  }

  /**
   * Enter a parse tree produced by `pqitaParser.operator`.
   * @param ctx the parse tree
   */
  enterOperator?: (ctx: OperatorContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.operator`.
   * @param ctx the parse tree
   */
  exitOperator?: (ctx: OperatorContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.similarity`.
   * @param ctx the parse tree
   */
  enterSimilarity?: (ctx: SimilarityContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.similarity`.
   * @param ctx the parse tree
   */
  exitSimilarity?: (ctx: SimilarityContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.degree`.
   * @param ctx the parse tree
   */
  enterDegree?: (ctx: DegreeContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.degree`.
   * @param ctx the parse tree
   */
  exitDegree?: (ctx: DegreeContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.article`.
   * @param ctx the parse tree
   */
  enterArticle?: (ctx: ArticleContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.article`.
   * @param ctx the parse tree
   */
  exitArticle?: (ctx: ArticleContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.quantifier`.
   * @param ctx the parse tree
   */
  enterQuantifier?: (ctx: QuantifierContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.quantifier`.
   * @param ctx the parse tree
   */
  exitQuantifier?: (ctx: QuantifierContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.posTag`.
   * @param ctx the parse tree
   */
  enterPosTag?: (ctx: PosTagContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.posTag`.
   * @param ctx the parse tree
   */
  exitPosTag?(ctx: PosTagContext): void {
    const pos = ctx.POS_TYPE().getText();
    const tag = this._options.posMap[pos];

    // if tag has form name=value, append [name="value"]
    const [name, value] = tag.split('=');
    if (value) {
      this.appendPair(`[${name}="${value}"]`, true);
    } else {
      // else append [pos="tag"]
      this.appendPair(`[pos="${tag}"]`, true);
    }
  }

  /**
   * Enter a parse tree produced by `pqitaParser.styleTag`.
   * @param ctx the parse tree
   */
  enterStyleTag?: (ctx: StyleTagContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.styleTag`.
   * @param ctx the parse tree
   */
  exitStyleTag?(ctx: StyleTagContext): void {
    const style = ctx.STYLE_TYPE().getText();
    let pair = '';

    if (style.includes('grassetto')) {
      pair = '[b="1"]';
    } else if (style.includes('corsivo')) {
      pair = '[i="1"]';
    } else if (style.includes('sottolineato')) {
      pair = '[u="1"]';
    }

    if (pair) {
      this.appendPair(pair, true);
    }
  }

  /**
   * Enter a parse tree produced by `pqitaParser.locationOrRelation`.
   * @param ctx the parse tree
   */
  enterLocationOrRelation?: (ctx: LocationOrRelationContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.locationOrRelation`.
   * @param ctx the parse tree
   */
  exitLocationOrRelation?: (ctx: LocationOrRelationContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.location`.
   * @param ctx the parse tree
   */
  enterLocation?: (ctx: LocationContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.location`.
   * @param ctx the parse tree
   */
  exitLocation?(ctx: LocationContext): void {
    const hasNot = ctx.negation() !== undefined;
    const locType = ctx.LOC_TYPE().getText();
    let alignment = '';

    if (locType.includes('inizio')) {
      alignment = hasNot ? 'LALIGN(n=1)' : 'LALIGN(m=0)';
    } else if (locType.includes('fine')) {
      alignment = hasNot ? 'RALIGN(n=1)' : 'RALIGN(m=0)';
    }

    if (alignment) {
      this._output += ` ${alignment} [$name="snt"]`;
    }
  }

  /**
   * Enter a parse tree produced by `pqitaParser.relation`.
   * @param ctx the parse tree
   */
  enterRelation?: (ctx: RelationContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.relation`.
   * @param ctx the parse tree
   */
  exitRelation?(ctx: RelationContext): void {
    const hasNot = ctx.negation() !== null;
    const relType = ctx.REL_TYPE().getText();
    let operator = '';

    if (hasNot) {
      this._output += ' NOT';
    }

    if (relType.includes('vicino')) {
      operator = `NEAR(m=${this._options.proximityThreshold},s=snt)`;
    } else if (relType.includes('attaccat')) {
      operator = 'NEAR(m=0,s=snt)';
    } else if (relType.includes('prima')) {
      operator = `BEFORE(m=${this._options.proximityThreshold},s=snt)`;
    } else if (relType.includes('dopo')) {
      operator = `AFTER(m=${this._options.proximityThreshold},s=snt)`;
    }

    if (operator) {
      this._output += ` ${operator} `;
      // next pair should not be connected with AND
      this._noAnd = true;
    }
  }

  /**
   * Enter a parse tree produced by `pqitaParser.recursiveExpression`.
   * @param ctx the parse tree
   */
  enterRecursiveExpression?: (ctx: RecursiveExpressionContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.recursiveExpression`.
   * @param ctx the parse tree
   */
  exitRecursiveExpression?: (ctx: RecursiveExpressionContext) => void;
  /**
   * Enter a parse tree produced by `pqitaParser.negation`.
   * @param ctx the parse tree
   */
  enterNegation?: (ctx: NegationContext) => void;
  /**
   * Exit a parse tree produced by `pqitaParser.negation`.
   * @param ctx the parse tree
   */
  exitNegation?: (ctx: NegationContext) => void;
}
