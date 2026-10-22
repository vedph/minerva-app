import { Token } from 'antlr4';

import {
  ExpressionContext,
  FeaturesContext,
  ForeignItemContext,
  ForeignSetContext,
  LemmaItemContext,
  LocationContext,
  LocutionItemContext,
  LocutionSetContext,
  OperatorContext,
  QueryContext,
  RelationContext,
  SubjectContext,
  ValueSpecContext,
  WordItemContext,
  WordSetContext,
} from './pqita.parser';

/**
 * Options for the PqitaTranslator.
 */
export interface PqitaTranslatorOptions {
  lowSimilarityThreshold: number;
  similarityThreshold: number;
  highSimilarityThreshold: number;
  /**
   * The maximum distance in tokens for "vicino a", "prima di", "dopo".
   */
  proximityThreshold: number;
  /**
   * The name of the structure representing a sentence.
   */
  sentenceName: string;
  /**
   * The Pythia pair for each grammatical feature, keyed by its pqita name
   * (with single spaces between words).
   */
  posMap: { [key: string]: string };
}

export const DEFAULT_PQITA_TRANSLATOR_OPTIONS: PqitaTranslatorOptions = {
  lowSimilarityThreshold: 0.5,
  similarityThreshold: 0.8,
  highSimilarityThreshold: 0.9,
  proximityThreshold: 3,
  sentenceName: 'snt',
  posMap: {
    // pos
    aggettivo: '[pos="ADJ"]',
    preposizione: '[pos="ADP"]',
    apposizione: '[pos="ADP"]',
    avverbio: '[pos="ADV"]',
    ausiliare: '[pos="AUX"]',
    'congiunzione coordinante': '[pos="CCONJ"]',
    determinante: '[pos="DET"]',
    interiezione: '[pos="INTJ"]',
    sostantivo: '[pos="NOUN"]',
    nome: '[pos="NOUN"]',
    numero: '[pos="NUM"]',
    pronome: '[pos="PRON"]',
    'nome proprio': '[pos="PROPN"]',
    'congiunzione subordinante': '[pos="SCONJ"]',
    simbolo: '[pos="SYM"]',
    verbo: '[pos="VERB"]',
    altro: '[pos="X"]',
    // verbform
    infinito: '[verbform="inf"]',
    gerundio: '[verbform="ger"]',
    participio: '[verbform="part"]',
    'modo definito': '[verbform="fin"]',
    'modo indefinito': '[verbform<>"fin"]',
    // mood
    indicativo: '[mood="ind"]',
    congiuntivo: '[mood="sub"]',
    condizionale: '[mood="cnd"]',
    imperativo: '[mood="imp"]',
    // tense
    presente: '[tense="pres"]',
    imperfetto: '[tense="imp"]',
    passato: '[tense="past"]',
    futuro: '[tense="fut"]',
    // person
    'prima persona': '[person="1"]',
    'seconda persona': '[person="2"]',
    'terza persona': '[person="3"]',
    // number
    singolare: '[number="sing"]',
    plurale: '[number="plur"]',
    // gender
    maschile: '[gender="masc"]',
    femminile: '[gender="fem"]',
    // clitic
    clitica: '[clitic="yes"]',
    // poss
    possessivo: '[poss="yes"]',
    // definite
    'articolo determinativo': '[definite="def"]',
    'articolo indeterminativo': '[definite="ind"]',
    // prontype
    articolo: '[prontype="art"]',
    'pronome dimostrativo': '[prontype="dem"]',
    'pronome indefinito': '[prontype="ind"]',
    'pronome interrogativo': '[prontype="int"]',
    'pronome negativo': '[prontype="neg"]',
    'pronome personale': '[prontype="prs"]',
    'pronome relativo': '[prontype="rel"]',
    'pronome totalizzante': '[prontype="tot"]',
    // degree
    comparativo: '[degree="cmp"]',
    superlativo: '[degree="abs"]',
  },
};

/**
 * Error thrown when a syntactically valid pqita sentence cannot be
 * translated.
 */
export class PqitaTranslationError extends Error {
  constructor(
    message: string,
    public readonly token: Token,
  ) {
    super(message);
  }
}

const LOCUTION_PAIR = '[$fp-lat]';

/**
 * The Pythia expression translated from a pqita query, and whether it is
 * compound, i.e. it must be wrapped in parentheses when used as the operand
 * of a location operator.
 */
interface PqitaExpression {
  sql: string;
  compound: boolean;
}

/**
 * Translator from a pqita parse tree into a Pythia query.
 */
export class PqitaTranslator {
  constructor(
    private readonly _options: PqitaTranslatorOptions = DEFAULT_PQITA_TRANSLATOR_OPTIONS,
  ) {}

  private static normalize(text: string): string {
    return text.replace(/\s+/g, ' ');
  }

  /**
   * Translate the parse tree of a pqita sentence into a Pythia query.
   *
   * @param ctx The expression context.
   * @returns The Pythia query.
   * @throws PqitaTranslationError when the sentence cannot be translated.
   */
  public translate(ctx: ExpressionContext): string {
    return this.translateQuery(ctx.query()).sql;
  }

  /**
   * Wrap the specified expression in parentheses when compound, so that
   * the operand of a location operator is evident.
   */
  private static group(expression: PqitaExpression): string {
    return expression.compound ? `(${expression.sql})` : expression.sql;
  }

  /**
   * Translate a query: its subject, filtered by its location and then by its
   * relation with the following query. Location operators being
   * right-associative in Pythia, the left operand is always grouped.
   */
  private translateQuery(ctx: QueryContext): PqitaExpression {
    const pairs = this.getSubjectPairs(ctx.subject());
    let expression: PqitaExpression = {
      sql: pairs.join(' AND '),
      compound: pairs.length > 1,
    };

    const location = ctx.location();
    if (location) {
      expression = {
        sql: `${PqitaTranslator.group(expression)} ${this.getLocation(location)}`,
        compound: true,
      };
    }

    const relation = ctx.relation();
    if (relation) {
      const right = this.translateQuery(relation.query());
      expression = {
        sql:
          `${PqitaTranslator.group(expression)} ` +
          `${this.getRelationOperator(relation)} ${PqitaTranslator.group(right)}`,
        compound: true,
      };
    }
    return expression;
  }

  private getLocation(ctx: LocationContext): string {
    const not = ctx.NEGATION() ? 'NOT ' : '';
    const op = ctx.LOC_START() ? 'LALIGN' : 'RALIGN';
    return `${not}${op}(m=0) [$${this._options.sentenceName}]`;
  }

  private getRelationOperator(ctx: RelationContext): string {
    const op = ctx.relOp();
    const m = op.ATTACHED_OP() ? 0 : this._options.proximityThreshold;
    const name = op.BEFORE_OP() ? 'BEFORE' : op.AFTER_OP() ? 'AFTER' : 'NEAR';
    const not = ctx.NEGATION() ? 'NOT ' : '';
    return `${not}${name}(m=${m},s=${this._options.sentenceName})`;
  }

  private getSubjectPairs(ctx: SubjectContext): string[] {
    const item = ctx.item();
    if (item instanceof WordItemContext) {
      return [
        ...this.getValuePairs('value', item.valueSpec()),
        ...this.getFeaturePairs(item.features()),
      ];
    }
    if (item instanceof LemmaItemContext) {
      return [
        ...this.getValuePairs('lemma', item.valueSpec()),
        ...this.getFeaturePairs(item.features()),
      ];
    }
    if (item instanceof ForeignItemContext) {
      return [
        this.getLanguagePair(item.FOREIGN().getText()),
        ...this.getValuePairs('value', item.valueSpec()),
        ...this.getFeaturePairs(item.features()),
      ];
    }
    if (item instanceof LocutionItemContext) {
      return [LOCUTION_PAIR, ...this.getValuePairs('$value', item.valueSpec())];
    }

    const set = ctx.set_();
    if (set instanceof WordSetContext) {
      return this.getFeaturePairs(set.features());
    }
    if (set instanceof ForeignSetContext) {
      return [
        this.getLanguagePair(set.FOREIGNS().getText()),
        ...this.getFeaturePairs(set.features()),
      ];
    }
    if (set instanceof LocutionSetContext) {
      return [LOCUTION_PAIR];
    }
    // not reachable for a tree without syntax errors
    throw new Error(`Unexpected pqita subject: ${ctx.getText()}`);
  }

  private getLanguagePair(foreign: string): string {
    if (foreign.startsWith('anglicism')) {
      return '[language="eng"]';
    }
    if (foreign.startsWith('latinism')) {
      return '[language="lat"]';
    }
    return '[language<>"ita"]';
  }

  private getOperator(ctx: OperatorContext | null, value: string): string {
    if (!ctx) {
      return `="${value}"`;
    }
    if (ctx.STARTS_OP()) {
      return `^="${value}"`;
    }
    if (ctx.ENDS_OP()) {
      return `$="${value}"`;
    }
    if (ctx.CONTAINS_OP()) {
      return `*="${value}"`;
    }
    if (ctx.WILDCARDS_OP()) {
      return `?="${value}"`;
    }
    const similarity = ctx.similarity();
    if (similarity) {
      const degree = similarity.DEGREE()?.getText();
      const threshold =
        degree === 'molto'
          ? this._options.highSimilarityThreshold
          : degree === 'poco'
            ? this._options.lowSimilarityThreshold
            : this._options.similarityThreshold;
      return `%="${value}:${threshold}"`;
    }
    // uguale a
    return `="${value}"`;
  }

  private getValuePairs(name: string, ctx: ValueSpecContext | null): string[] {
    if (!ctx) {
      return [];
    }
    const token = ctx.VALUE().symbol;
    const value = token.text.slice(1, -1).trim();
    if (!value) {
      throw new PqitaTranslationError(
        $localize`:@@pqita.emptyValue:The text between double quotes is empty.`,
        token,
      );
    }
    return [`[${name}${this.getOperator(ctx.operator(), value)}]`];
  }

  private getFeaturePairs(ctx: FeaturesContext | null): string[] {
    if (!ctx) {
      return [];
    }
    const pairs = (ctx.posTags()?.POS_TYPE_list() ?? []).map(
      (pos) => this._options.posMap[PqitaTranslator.normalize(pos.getText())],
    );

    const style = ctx.styleTag()?.STYLE_TYPE().getText();
    if (style?.endsWith('grassetto')) {
      pairs.push('[b="1"]');
    } else if (style?.endsWith('corsivo')) {
      pairs.push('[i="1"]');
    } else if (style?.endsWith('sottolineato')) {
      pairs.push('[u="1"]');
    }
    return pairs;
  }
}
