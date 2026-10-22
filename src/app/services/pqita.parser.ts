// Generated from pqita.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import pqitaListener from "./pqita.listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class PqitaParser extends Parser {
	public static readonly VERB = 1;
	public static readonly ARTICLE = 2;
	public static readonly PLURAL_ARTICLE = 3;
	public static readonly QUANTIFIER = 4;
	public static readonly WORD = 5;
	public static readonly WORDS = 6;
	public static readonly LEMMA = 7;
	public static readonly LOCUTION = 8;
	public static readonly LOCUTIONS = 9;
	public static readonly FOREIGN = 10;
	public static readonly FOREIGNS = 11;
	public static readonly EQ_OP = 12;
	public static readonly STARTS_OP = 13;
	public static readonly ENDS_OP = 14;
	public static readonly CONTAINS_OP = 15;
	public static readonly WILDCARDS_OP = 16;
	public static readonly SIMILAR_OP = 17;
	public static readonly DEGREE = 18;
	public static readonly COME = 19;
	public static readonly POS_TYPE = 20;
	public static readonly STYLE_TYPE = 21;
	public static readonly NEGATION = 22;
	public static readonly LOC_START = 23;
	public static readonly LOC_END = 24;
	public static readonly NEAR_OP = 25;
	public static readonly ATTACHED_OP = 26;
	public static readonly BEFORE_OP = 27;
	public static readonly AFTER_OP = 28;
	public static readonly VALUE = 29;
	public static readonly WS = 30;
	public static readonly UNCLOSED_VALUE = 31;
	public static readonly UNKNOWN = 32;
	public static readonly ERROR_CHAR = 33;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_expression = 0;
	public static readonly RULE_query = 1;
	public static readonly RULE_verb = 2;
	public static readonly RULE_subject = 3;
	public static readonly RULE_item = 4;
	public static readonly RULE_set = 5;
	public static readonly RULE_article = 6;
	public static readonly RULE_valueSpec = 7;
	public static readonly RULE_operator = 8;
	public static readonly RULE_similarity = 9;
	public static readonly RULE_features = 10;
	public static readonly RULE_posTags = 11;
	public static readonly RULE_styleTag = 12;
	public static readonly RULE_location = 13;
	public static readonly RULE_relation = 14;
	public static readonly RULE_relOp = 15;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, "'parola'", 
                                                            "'parole'", 
                                                            "'lemma'", "'locuzione'", 
                                                            "'locuzioni'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'contenente'", 
                                                            null, null, 
                                                            null, "'come'", 
                                                            null, null, 
                                                            "'non'", null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'dopo'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "VERB", 
                                                             "ARTICLE", 
                                                             "PLURAL_ARTICLE", 
                                                             "QUANTIFIER", 
                                                             "WORD", "WORDS", 
                                                             "LEMMA", "LOCUTION", 
                                                             "LOCUTIONS", 
                                                             "FOREIGN", 
                                                             "FOREIGNS", 
                                                             "EQ_OP", "STARTS_OP", 
                                                             "ENDS_OP", 
                                                             "CONTAINS_OP", 
                                                             "WILDCARDS_OP", 
                                                             "SIMILAR_OP", 
                                                             "DEGREE", "COME", 
                                                             "POS_TYPE", 
                                                             "STYLE_TYPE", 
                                                             "NEGATION", 
                                                             "LOC_START", 
                                                             "LOC_END", 
                                                             "NEAR_OP", 
                                                             "ATTACHED_OP", 
                                                             "BEFORE_OP", 
                                                             "AFTER_OP", 
                                                             "VALUE", "WS", 
                                                             "UNCLOSED_VALUE", 
                                                             "UNKNOWN", 
                                                             "ERROR_CHAR" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expression", "query", "verb", "subject", "item", "set", "article", "valueSpec", 
		"operator", "similarity", "features", "posTags", "styleTag", "location", 
		"relation", "relOp",
	];
	public get grammarFileName(): string { return "pqita.g4"; }
	public get literalNames(): (string | null)[] { return PqitaParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return PqitaParser.symbolicNames; }
	public get ruleNames(): string[] { return PqitaParser.ruleNames; }
	public get serializedATN(): number[] { return PqitaParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, PqitaParser._ATN, PqitaParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PqitaParser.RULE_expression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 33;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 32;
				this.verb();
				}
			}

			this.state = 35;
			this.query();
			this.state = 36;
			this.match(PqitaParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public query(): QueryContext {
		let localctx: QueryContext = new QueryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PqitaParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 38;
			this.subject();
			this.state = 40;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 39;
				this.location();
				}
				break;
			}
			this.state = 43;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 507510784) !== 0)) {
				{
				this.state = 42;
				this.relation();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public verb(): VerbContext {
		let localctx: VerbContext = new VerbContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PqitaParser.RULE_verb);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 45;
			this.match(PqitaParser.VERB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public subject(): SubjectContext {
		let localctx: SubjectContext = new SubjectContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, PqitaParser.RULE_subject);
		try {
			this.state = 49;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 5:
			case 7:
			case 8:
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 47;
				this.item();
				}
				break;
			case 3:
			case 4:
			case 6:
			case 9:
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 48;
				this.set_();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public item(): ItemContext {
		let localctx: ItemContext = new ItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, PqitaParser.RULE_item);
		let _la: number;
		try {
			this.state = 87;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				localctx = new WordItemContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 52;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 51;
					this.article();
					}
				}

				this.state = 54;
				this.match(PqitaParser.WORD);
				this.state = 60;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 12:
				case 13:
				case 14:
				case 15:
				case 16:
				case 17:
				case 18:
				case 29:
					{
					this.state = 55;
					this.valueSpec();
					this.state = 57;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===19 || _la===21) {
						{
						this.state = 56;
						this.features();
						}
					}

					}
					break;
				case 19:
				case 21:
					{
					this.state = 59;
					this.features();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case 2:
				localctx = new LemmaItemContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 63;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 62;
					this.article();
					}
				}

				this.state = 65;
				this.match(PqitaParser.LEMMA);
				this.state = 66;
				this.valueSpec();
				this.state = 68;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===19 || _la===21) {
					{
					this.state = 67;
					this.features();
					}
				}

				}
				break;
			case 3:
				localctx = new ForeignItemContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 70;
					this.article();
					}
				}

				this.state = 73;
				this.match(PqitaParser.FOREIGN);
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 537391104) !== 0)) {
					{
					this.state = 74;
					this.valueSpec();
					}
				}

				this.state = 78;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===19 || _la===21) {
					{
					this.state = 77;
					this.features();
					}
				}

				}
				break;
			case 4:
				localctx = new LocutionItemContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 81;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 80;
					this.article();
					}
				}

				this.state = 83;
				this.match(PqitaParser.LOCUTION);
				this.state = 85;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 537391104) !== 0)) {
					{
					this.state = 84;
					this.valueSpec();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public set_(): SetContext {
		let localctx: SetContext = new SetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PqitaParser.RULE_set);
		let _la: number;
		try {
			this.state = 114;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				localctx = new WordSetContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===4) {
					{
					this.state = 89;
					this.match(PqitaParser.QUANTIFIER);
					}
				}

				this.state = 93;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===3) {
					{
					this.state = 92;
					this.match(PqitaParser.PLURAL_ARTICLE);
					}
				}

				this.state = 95;
				this.match(PqitaParser.WORDS);
				this.state = 96;
				this.features();
				}
				break;
			case 2:
				localctx = new ForeignSetContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===4) {
					{
					this.state = 97;
					this.match(PqitaParser.QUANTIFIER);
					}
				}

				this.state = 101;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===3) {
					{
					this.state = 100;
					this.match(PqitaParser.PLURAL_ARTICLE);
					}
				}

				this.state = 103;
				this.match(PqitaParser.FOREIGNS);
				this.state = 105;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===19 || _la===21) {
					{
					this.state = 104;
					this.features();
					}
				}

				}
				break;
			case 3:
				localctx = new LocutionSetContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===4) {
					{
					this.state = 107;
					this.match(PqitaParser.QUANTIFIER);
					}
				}

				this.state = 111;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===3) {
					{
					this.state = 110;
					this.match(PqitaParser.PLURAL_ARTICLE);
					}
				}

				this.state = 113;
				this.match(PqitaParser.LOCUTIONS);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public article(): ArticleContext {
		let localctx: ArticleContext = new ArticleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, PqitaParser.RULE_article);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 116;
			this.match(PqitaParser.ARTICLE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public valueSpec(): ValueSpecContext {
		let localctx: ValueSpecContext = new ValueSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, PqitaParser.RULE_valueSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 119;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 520192) !== 0)) {
				{
				this.state = 118;
				this.operator();
				}
			}

			this.state = 121;
			this.match(PqitaParser.VALUE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operator(): OperatorContext {
		let localctx: OperatorContext = new OperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PqitaParser.RULE_operator);
		try {
			this.state = 129;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 123;
				this.match(PqitaParser.EQ_OP);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 124;
				this.match(PqitaParser.STARTS_OP);
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 125;
				this.match(PqitaParser.ENDS_OP);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 126;
				this.match(PqitaParser.CONTAINS_OP);
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 127;
				this.match(PqitaParser.WILDCARDS_OP);
				}
				break;
			case 17:
			case 18:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 128;
				this.similarity();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public similarity(): SimilarityContext {
		let localctx: SimilarityContext = new SimilarityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PqitaParser.RULE_similarity);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 132;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 131;
				this.match(PqitaParser.DEGREE);
				}
			}

			this.state = 134;
			this.match(PqitaParser.SIMILAR_OP);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public features(): FeaturesContext {
		let localctx: FeaturesContext = new FeaturesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, PqitaParser.RULE_features);
		let _la: number;
		try {
			this.state = 141;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 136;
				this.posTags();
				this.state = 138;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===21) {
					{
					this.state = 137;
					this.styleTag();
					}
				}

				}
				break;
			case 21:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 140;
				this.styleTag();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public posTags(): PosTagsContext {
		let localctx: PosTagsContext = new PosTagsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, PqitaParser.RULE_posTags);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 143;
			this.match(PqitaParser.COME);
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 144;
				this.match(PqitaParser.POS_TYPE);
				}
				}
				this.state = 147;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===20);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public styleTag(): StyleTagContext {
		let localctx: StyleTagContext = new StyleTagContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, PqitaParser.RULE_styleTag);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 149;
			this.match(PqitaParser.STYLE_TYPE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public location(): LocationContext {
		let localctx: LocationContext = new LocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, PqitaParser.RULE_location);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 152;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===22) {
				{
				this.state = 151;
				this.match(PqitaParser.NEGATION);
				}
			}

			this.state = 154;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===24)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public relation(): RelationContext {
		let localctx: RelationContext = new RelationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, PqitaParser.RULE_relation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 157;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===22) {
				{
				this.state = 156;
				this.match(PqitaParser.NEGATION);
				}
			}

			this.state = 159;
			this.relOp();
			this.state = 160;
			this.query();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public relOp(): RelOpContext {
		let localctx: RelOpContext = new RelOpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, PqitaParser.RULE_relOp);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 162;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 503316480) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,33,165,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,1,0,3,0,34,8,
	0,1,0,1,0,1,0,1,1,1,1,3,1,41,8,1,1,1,3,1,44,8,1,1,2,1,2,1,3,1,3,3,3,50,
	8,3,1,4,3,4,53,8,4,1,4,1,4,1,4,3,4,58,8,4,1,4,3,4,61,8,4,1,4,3,4,64,8,4,
	1,4,1,4,1,4,3,4,69,8,4,1,4,3,4,72,8,4,1,4,1,4,3,4,76,8,4,1,4,3,4,79,8,4,
	1,4,3,4,82,8,4,1,4,1,4,3,4,86,8,4,3,4,88,8,4,1,5,3,5,91,8,5,1,5,3,5,94,
	8,5,1,5,1,5,1,5,3,5,99,8,5,1,5,3,5,102,8,5,1,5,1,5,3,5,106,8,5,1,5,3,5,
	109,8,5,1,5,3,5,112,8,5,1,5,3,5,115,8,5,1,6,1,6,1,7,3,7,120,8,7,1,7,1,7,
	1,8,1,8,1,8,1,8,1,8,1,8,3,8,130,8,8,1,9,3,9,133,8,9,1,9,1,9,1,10,1,10,3,
	10,139,8,10,1,10,3,10,142,8,10,1,11,1,11,4,11,146,8,11,11,11,12,11,147,
	1,12,1,12,1,13,3,13,153,8,13,1,13,1,13,1,14,3,14,158,8,14,1,14,1,14,1,14,
	1,15,1,15,1,15,0,0,16,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,0,2,1,
	0,23,24,1,0,25,28,186,0,33,1,0,0,0,2,38,1,0,0,0,4,45,1,0,0,0,6,49,1,0,0,
	0,8,87,1,0,0,0,10,114,1,0,0,0,12,116,1,0,0,0,14,119,1,0,0,0,16,129,1,0,
	0,0,18,132,1,0,0,0,20,141,1,0,0,0,22,143,1,0,0,0,24,149,1,0,0,0,26,152,
	1,0,0,0,28,157,1,0,0,0,30,162,1,0,0,0,32,34,3,4,2,0,33,32,1,0,0,0,33,34,
	1,0,0,0,34,35,1,0,0,0,35,36,3,2,1,0,36,37,5,0,0,1,37,1,1,0,0,0,38,40,3,
	6,3,0,39,41,3,26,13,0,40,39,1,0,0,0,40,41,1,0,0,0,41,43,1,0,0,0,42,44,3,
	28,14,0,43,42,1,0,0,0,43,44,1,0,0,0,44,3,1,0,0,0,45,46,5,1,0,0,46,5,1,0,
	0,0,47,50,3,8,4,0,48,50,3,10,5,0,49,47,1,0,0,0,49,48,1,0,0,0,50,7,1,0,0,
	0,51,53,3,12,6,0,52,51,1,0,0,0,52,53,1,0,0,0,53,54,1,0,0,0,54,60,5,5,0,
	0,55,57,3,14,7,0,56,58,3,20,10,0,57,56,1,0,0,0,57,58,1,0,0,0,58,61,1,0,
	0,0,59,61,3,20,10,0,60,55,1,0,0,0,60,59,1,0,0,0,61,88,1,0,0,0,62,64,3,12,
	6,0,63,62,1,0,0,0,63,64,1,0,0,0,64,65,1,0,0,0,65,66,5,7,0,0,66,68,3,14,
	7,0,67,69,3,20,10,0,68,67,1,0,0,0,68,69,1,0,0,0,69,88,1,0,0,0,70,72,3,12,
	6,0,71,70,1,0,0,0,71,72,1,0,0,0,72,73,1,0,0,0,73,75,5,10,0,0,74,76,3,14,
	7,0,75,74,1,0,0,0,75,76,1,0,0,0,76,78,1,0,0,0,77,79,3,20,10,0,78,77,1,0,
	0,0,78,79,1,0,0,0,79,88,1,0,0,0,80,82,3,12,6,0,81,80,1,0,0,0,81,82,1,0,
	0,0,82,83,1,0,0,0,83,85,5,8,0,0,84,86,3,14,7,0,85,84,1,0,0,0,85,86,1,0,
	0,0,86,88,1,0,0,0,87,52,1,0,0,0,87,63,1,0,0,0,87,71,1,0,0,0,87,81,1,0,0,
	0,88,9,1,0,0,0,89,91,5,4,0,0,90,89,1,0,0,0,90,91,1,0,0,0,91,93,1,0,0,0,
	92,94,5,3,0,0,93,92,1,0,0,0,93,94,1,0,0,0,94,95,1,0,0,0,95,96,5,6,0,0,96,
	115,3,20,10,0,97,99,5,4,0,0,98,97,1,0,0,0,98,99,1,0,0,0,99,101,1,0,0,0,
	100,102,5,3,0,0,101,100,1,0,0,0,101,102,1,0,0,0,102,103,1,0,0,0,103,105,
	5,11,0,0,104,106,3,20,10,0,105,104,1,0,0,0,105,106,1,0,0,0,106,115,1,0,
	0,0,107,109,5,4,0,0,108,107,1,0,0,0,108,109,1,0,0,0,109,111,1,0,0,0,110,
	112,5,3,0,0,111,110,1,0,0,0,111,112,1,0,0,0,112,113,1,0,0,0,113,115,5,9,
	0,0,114,90,1,0,0,0,114,98,1,0,0,0,114,108,1,0,0,0,115,11,1,0,0,0,116,117,
	5,2,0,0,117,13,1,0,0,0,118,120,3,16,8,0,119,118,1,0,0,0,119,120,1,0,0,0,
	120,121,1,0,0,0,121,122,5,29,0,0,122,15,1,0,0,0,123,130,5,12,0,0,124,130,
	5,13,0,0,125,130,5,14,0,0,126,130,5,15,0,0,127,130,5,16,0,0,128,130,3,18,
	9,0,129,123,1,0,0,0,129,124,1,0,0,0,129,125,1,0,0,0,129,126,1,0,0,0,129,
	127,1,0,0,0,129,128,1,0,0,0,130,17,1,0,0,0,131,133,5,18,0,0,132,131,1,0,
	0,0,132,133,1,0,0,0,133,134,1,0,0,0,134,135,5,17,0,0,135,19,1,0,0,0,136,
	138,3,22,11,0,137,139,3,24,12,0,138,137,1,0,0,0,138,139,1,0,0,0,139,142,
	1,0,0,0,140,142,3,24,12,0,141,136,1,0,0,0,141,140,1,0,0,0,142,21,1,0,0,
	0,143,145,5,19,0,0,144,146,5,20,0,0,145,144,1,0,0,0,146,147,1,0,0,0,147,
	145,1,0,0,0,147,148,1,0,0,0,148,23,1,0,0,0,149,150,5,21,0,0,150,25,1,0,
	0,0,151,153,5,22,0,0,152,151,1,0,0,0,152,153,1,0,0,0,153,154,1,0,0,0,154,
	155,7,0,0,0,155,27,1,0,0,0,156,158,5,22,0,0,157,156,1,0,0,0,157,158,1,0,
	0,0,158,159,1,0,0,0,159,160,3,30,15,0,160,161,3,2,1,0,161,29,1,0,0,0,162,
	163,7,1,0,0,163,31,1,0,0,0,31,33,40,43,49,52,57,60,63,68,71,75,78,81,85,
	87,90,93,98,101,105,108,111,114,119,129,132,138,141,147,152,157];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PqitaParser.__ATN) {
			PqitaParser.__ATN = new ATNDeserializer().deserialize(PqitaParser._serializedATN);
		}

		return PqitaParser.__ATN;
	}


	static DecisionsToDFA = PqitaParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public query(): QueryContext {
		return this.getTypedRuleContext(QueryContext, 0) as QueryContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(PqitaParser.EOF, 0);
	}
	public verb(): VerbContext {
		return this.getTypedRuleContext(VerbContext, 0) as VerbContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_expression;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterExpression) {
	 		listener.enterExpression(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitExpression) {
	 		listener.exitExpression(this);
		}
	}
}


export class QueryContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public subject(): SubjectContext {
		return this.getTypedRuleContext(SubjectContext, 0) as SubjectContext;
	}
	public location(): LocationContext {
		return this.getTypedRuleContext(LocationContext, 0) as LocationContext;
	}
	public relation(): RelationContext {
		return this.getTypedRuleContext(RelationContext, 0) as RelationContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_query;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterQuery) {
	 		listener.enterQuery(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitQuery) {
	 		listener.exitQuery(this);
		}
	}
}


export class VerbContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VERB(): TerminalNode {
		return this.getToken(PqitaParser.VERB, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_verb;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterVerb) {
	 		listener.enterVerb(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitVerb) {
	 		listener.exitVerb(this);
		}
	}
}


export class SubjectContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public item(): ItemContext {
		return this.getTypedRuleContext(ItemContext, 0) as ItemContext;
	}
	public set_(): SetContext {
		return this.getTypedRuleContext(SetContext, 0) as SetContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_subject;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterSubject) {
	 		listener.enterSubject(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitSubject) {
	 		listener.exitSubject(this);
		}
	}
}


export class ItemContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_item;
	}
	public override copyFrom(ctx: ItemContext): void {
		super.copyFrom(ctx);
	}
}
export class WordItemContext extends ItemContext {
	constructor(parser: PqitaParser, ctx: ItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public WORD(): TerminalNode {
		return this.getToken(PqitaParser.WORD, 0);
	}
	public valueSpec(): ValueSpecContext {
		return this.getTypedRuleContext(ValueSpecContext, 0) as ValueSpecContext;
	}
	public features(): FeaturesContext {
		return this.getTypedRuleContext(FeaturesContext, 0) as FeaturesContext;
	}
	public article(): ArticleContext {
		return this.getTypedRuleContext(ArticleContext, 0) as ArticleContext;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterWordItem) {
	 		listener.enterWordItem(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitWordItem) {
	 		listener.exitWordItem(this);
		}
	}
}
export class LocutionItemContext extends ItemContext {
	constructor(parser: PqitaParser, ctx: ItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LOCUTION(): TerminalNode {
		return this.getToken(PqitaParser.LOCUTION, 0);
	}
	public article(): ArticleContext {
		return this.getTypedRuleContext(ArticleContext, 0) as ArticleContext;
	}
	public valueSpec(): ValueSpecContext {
		return this.getTypedRuleContext(ValueSpecContext, 0) as ValueSpecContext;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterLocutionItem) {
	 		listener.enterLocutionItem(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitLocutionItem) {
	 		listener.exitLocutionItem(this);
		}
	}
}
export class LemmaItemContext extends ItemContext {
	constructor(parser: PqitaParser, ctx: ItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LEMMA(): TerminalNode {
		return this.getToken(PqitaParser.LEMMA, 0);
	}
	public valueSpec(): ValueSpecContext {
		return this.getTypedRuleContext(ValueSpecContext, 0) as ValueSpecContext;
	}
	public article(): ArticleContext {
		return this.getTypedRuleContext(ArticleContext, 0) as ArticleContext;
	}
	public features(): FeaturesContext {
		return this.getTypedRuleContext(FeaturesContext, 0) as FeaturesContext;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterLemmaItem) {
	 		listener.enterLemmaItem(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitLemmaItem) {
	 		listener.exitLemmaItem(this);
		}
	}
}
export class ForeignItemContext extends ItemContext {
	constructor(parser: PqitaParser, ctx: ItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public FOREIGN(): TerminalNode {
		return this.getToken(PqitaParser.FOREIGN, 0);
	}
	public article(): ArticleContext {
		return this.getTypedRuleContext(ArticleContext, 0) as ArticleContext;
	}
	public valueSpec(): ValueSpecContext {
		return this.getTypedRuleContext(ValueSpecContext, 0) as ValueSpecContext;
	}
	public features(): FeaturesContext {
		return this.getTypedRuleContext(FeaturesContext, 0) as FeaturesContext;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterForeignItem) {
	 		listener.enterForeignItem(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitForeignItem) {
	 		listener.exitForeignItem(this);
		}
	}
}


export class SetContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_set;
	}
	public override copyFrom(ctx: SetContext): void {
		super.copyFrom(ctx);
	}
}
export class ForeignSetContext extends SetContext {
	constructor(parser: PqitaParser, ctx: SetContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public FOREIGNS(): TerminalNode {
		return this.getToken(PqitaParser.FOREIGNS, 0);
	}
	public QUANTIFIER(): TerminalNode {
		return this.getToken(PqitaParser.QUANTIFIER, 0);
	}
	public PLURAL_ARTICLE(): TerminalNode {
		return this.getToken(PqitaParser.PLURAL_ARTICLE, 0);
	}
	public features(): FeaturesContext {
		return this.getTypedRuleContext(FeaturesContext, 0) as FeaturesContext;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterForeignSet) {
	 		listener.enterForeignSet(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitForeignSet) {
	 		listener.exitForeignSet(this);
		}
	}
}
export class LocutionSetContext extends SetContext {
	constructor(parser: PqitaParser, ctx: SetContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LOCUTIONS(): TerminalNode {
		return this.getToken(PqitaParser.LOCUTIONS, 0);
	}
	public QUANTIFIER(): TerminalNode {
		return this.getToken(PqitaParser.QUANTIFIER, 0);
	}
	public PLURAL_ARTICLE(): TerminalNode {
		return this.getToken(PqitaParser.PLURAL_ARTICLE, 0);
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterLocutionSet) {
	 		listener.enterLocutionSet(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitLocutionSet) {
	 		listener.exitLocutionSet(this);
		}
	}
}
export class WordSetContext extends SetContext {
	constructor(parser: PqitaParser, ctx: SetContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public WORDS(): TerminalNode {
		return this.getToken(PqitaParser.WORDS, 0);
	}
	public features(): FeaturesContext {
		return this.getTypedRuleContext(FeaturesContext, 0) as FeaturesContext;
	}
	public QUANTIFIER(): TerminalNode {
		return this.getToken(PqitaParser.QUANTIFIER, 0);
	}
	public PLURAL_ARTICLE(): TerminalNode {
		return this.getToken(PqitaParser.PLURAL_ARTICLE, 0);
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterWordSet) {
	 		listener.enterWordSet(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitWordSet) {
	 		listener.exitWordSet(this);
		}
	}
}


export class ArticleContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ARTICLE(): TerminalNode {
		return this.getToken(PqitaParser.ARTICLE, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_article;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterArticle) {
	 		listener.enterArticle(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitArticle) {
	 		listener.exitArticle(this);
		}
	}
}


export class ValueSpecContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VALUE(): TerminalNode {
		return this.getToken(PqitaParser.VALUE, 0);
	}
	public operator(): OperatorContext {
		return this.getTypedRuleContext(OperatorContext, 0) as OperatorContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_valueSpec;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterValueSpec) {
	 		listener.enterValueSpec(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitValueSpec) {
	 		listener.exitValueSpec(this);
		}
	}
}


export class OperatorContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQ_OP(): TerminalNode {
		return this.getToken(PqitaParser.EQ_OP, 0);
	}
	public STARTS_OP(): TerminalNode {
		return this.getToken(PqitaParser.STARTS_OP, 0);
	}
	public ENDS_OP(): TerminalNode {
		return this.getToken(PqitaParser.ENDS_OP, 0);
	}
	public CONTAINS_OP(): TerminalNode {
		return this.getToken(PqitaParser.CONTAINS_OP, 0);
	}
	public WILDCARDS_OP(): TerminalNode {
		return this.getToken(PqitaParser.WILDCARDS_OP, 0);
	}
	public similarity(): SimilarityContext {
		return this.getTypedRuleContext(SimilarityContext, 0) as SimilarityContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_operator;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterOperator) {
	 		listener.enterOperator(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitOperator) {
	 		listener.exitOperator(this);
		}
	}
}


export class SimilarityContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SIMILAR_OP(): TerminalNode {
		return this.getToken(PqitaParser.SIMILAR_OP, 0);
	}
	public DEGREE(): TerminalNode {
		return this.getToken(PqitaParser.DEGREE, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_similarity;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterSimilarity) {
	 		listener.enterSimilarity(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitSimilarity) {
	 		listener.exitSimilarity(this);
		}
	}
}


export class FeaturesContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public posTags(): PosTagsContext {
		return this.getTypedRuleContext(PosTagsContext, 0) as PosTagsContext;
	}
	public styleTag(): StyleTagContext {
		return this.getTypedRuleContext(StyleTagContext, 0) as StyleTagContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_features;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterFeatures) {
	 		listener.enterFeatures(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitFeatures) {
	 		listener.exitFeatures(this);
		}
	}
}


export class PosTagsContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COME(): TerminalNode {
		return this.getToken(PqitaParser.COME, 0);
	}
	public POS_TYPE_list(): TerminalNode[] {
	    	return this.getTokens(PqitaParser.POS_TYPE);
	}
	public POS_TYPE(i: number): TerminalNode {
		return this.getToken(PqitaParser.POS_TYPE, i);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_posTags;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterPosTags) {
	 		listener.enterPosTags(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitPosTags) {
	 		listener.exitPosTags(this);
		}
	}
}


export class StyleTagContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STYLE_TYPE(): TerminalNode {
		return this.getToken(PqitaParser.STYLE_TYPE, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_styleTag;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterStyleTag) {
	 		listener.enterStyleTag(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitStyleTag) {
	 		listener.exitStyleTag(this);
		}
	}
}


export class LocationContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LOC_START(): TerminalNode {
		return this.getToken(PqitaParser.LOC_START, 0);
	}
	public LOC_END(): TerminalNode {
		return this.getToken(PqitaParser.LOC_END, 0);
	}
	public NEGATION(): TerminalNode {
		return this.getToken(PqitaParser.NEGATION, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_location;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterLocation) {
	 		listener.enterLocation(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitLocation) {
	 		listener.exitLocation(this);
		}
	}
}


export class RelationContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public relOp(): RelOpContext {
		return this.getTypedRuleContext(RelOpContext, 0) as RelOpContext;
	}
	public query(): QueryContext {
		return this.getTypedRuleContext(QueryContext, 0) as QueryContext;
	}
	public NEGATION(): TerminalNode {
		return this.getToken(PqitaParser.NEGATION, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_relation;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterRelation) {
	 		listener.enterRelation(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitRelation) {
	 		listener.exitRelation(this);
		}
	}
}


export class RelOpContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEAR_OP(): TerminalNode {
		return this.getToken(PqitaParser.NEAR_OP, 0);
	}
	public ATTACHED_OP(): TerminalNode {
		return this.getToken(PqitaParser.ATTACHED_OP, 0);
	}
	public BEFORE_OP(): TerminalNode {
		return this.getToken(PqitaParser.BEFORE_OP, 0);
	}
	public AFTER_OP(): TerminalNode {
		return this.getToken(PqitaParser.AFTER_OP, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_relOp;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterRelOp) {
	 		listener.enterRelOp(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitRelOp) {
	 		listener.exitRelOp(this);
		}
	}
}
