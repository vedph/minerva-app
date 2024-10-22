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
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly ITEM = 17;
	public static readonly SET_TYPE = 18;
	public static readonly POS_TYPE = 19;
	public static readonly STYLE_TYPE = 20;
	public static readonly LOC_TYPE = 21;
	public static readonly REL_TYPE = 22;
	public static readonly VALUE = 23;
	public static readonly WS = 24;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_expression = 0;
	public static readonly RULE_verb = 1;
	public static readonly RULE_itemOrSet = 2;
	public static readonly RULE_item = 3;
	public static readonly RULE_itemContinuation = 4;
	public static readonly RULE_set = 5;
	public static readonly RULE_operator = 6;
	public static readonly RULE_similarity = 7;
	public static readonly RULE_degree = 8;
	public static readonly RULE_article = 9;
	public static readonly RULE_quantifier = 10;
	public static readonly RULE_posTag = 11;
	public static readonly RULE_styleTag = 12;
	public static readonly RULE_locationOrRelation = 13;
	public static readonly RULE_location = 14;
	public static readonly RULE_relation = 15;
	public static readonly RULE_recursiveExpression = 16;
	public static readonly RULE_negation = 17;
	public static readonly literalNames: (string | null)[] = [ null, "'trova'",
                                                            "'uguale a'",
                                                            "'iniziante per'",
                                                            "'terminante per'",
                                                            "'contenente'",
                                                            "'corrispondente a'",
                                                            "'simile a'",
                                                            "'molto'", "'poco'",
                                                            "'la'", "'il'",
                                                            "'l''", "'tutte'",
                                                            "'tutti'", "'come'",
                                                            "'non'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null,
                                                             null, null,
                                                             null, null,
                                                             null, null,
                                                             null, null,
                                                             null, null,
                                                             null, null,
                                                             null, null,
                                                             null, "ITEM",
                                                             "SET_TYPE",
                                                             "POS_TYPE",
                                                             "STYLE_TYPE",
                                                             "LOC_TYPE",
                                                             "REL_TYPE",
                                                             "VALUE", "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expression", "verb", "itemOrSet", "item", "itemContinuation", "set",
		"operator", "similarity", "degree", "article", "quantifier", "posTag",
		"styleTag", "locationOrRelation", "location", "relation", "recursiveExpression",
		"negation",
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
			this.state = 37;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 36;
				this.verb();
				}
			}

			this.state = 39;
			this.itemOrSet();
			this.state = 41;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===15) {
				{
				this.state = 40;
				this.posTag();
				}
			}

			this.state = 44;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===20) {
				{
				this.state = 43;
				this.styleTag();
				}
			}

			this.state = 47;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6356992) !== 0)) {
				{
				this.state = 46;
				this.locationOrRelation();
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
		this.enterRule(localctx, 2, PqitaParser.RULE_verb);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 49;
			this.match(PqitaParser.T__0);
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
	public itemOrSet(): ItemOrSetContext {
		let localctx: ItemOrSetContext = new ItemOrSetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PqitaParser.RULE_itemOrSet);
		try {
			this.state = 53;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
			case 11:
			case 12:
			case 17:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 51;
				this.item();
				}
				break;
			case 13:
			case 14:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 52;
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
		this.enterRule(localctx, 6, PqitaParser.RULE_item);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 56;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7168) !== 0)) {
				{
				this.state = 55;
				this.article();
				}
			}

			this.state = 58;
			this.match(PqitaParser.ITEM);
			this.state = 59;
			this.itemContinuation();
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
	public itemContinuation(): ItemContinuationContext {
		let localctx: ItemContinuationContext = new ItemContinuationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, PqitaParser.RULE_itemContinuation);
		try {
			this.state = 65;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 61;
				this.operator();
				this.state = 62;
				this.match(PqitaParser.VALUE);
				}
				}
				break;
			case 23:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 64;
				this.match(PqitaParser.VALUE);
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
	public set_(): SetContext {
		let localctx: SetContext = new SetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PqitaParser.RULE_set);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 67;
			this.quantifier();
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7168) !== 0)) {
				{
				this.state = 68;
				this.article();
				}
			}

			this.state = 71;
			this.match(PqitaParser.SET_TYPE);
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
		this.enterRule(localctx, 12, PqitaParser.RULE_operator);
		try {
			this.state = 79;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 73;
				this.match(PqitaParser.T__1);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 74;
				this.match(PqitaParser.T__2);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 75;
				this.match(PqitaParser.T__3);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 76;
				this.match(PqitaParser.T__4);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 77;
				this.match(PqitaParser.T__5);
				}
				break;
			case 7:
			case 8:
			case 9:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 78;
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
		this.enterRule(localctx, 14, PqitaParser.RULE_similarity);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8 || _la===9) {
				{
				this.state = 81;
				this.degree();
				}
			}

			this.state = 84;
			this.match(PqitaParser.T__6);
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
	public degree(): DegreeContext {
		let localctx: DegreeContext = new DegreeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PqitaParser.RULE_degree);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 86;
			_la = this._input.LA(1);
			if(!(_la===8 || _la===9)) {
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
	public article(): ArticleContext {
		let localctx: ArticleContext = new ArticleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PqitaParser.RULE_article);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 88;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 7168) !== 0))) {
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
	public quantifier(): QuantifierContext {
		let localctx: QuantifierContext = new QuantifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, PqitaParser.RULE_quantifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 90;
			_la = this._input.LA(1);
			if(!(_la===13 || _la===14)) {
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
	public posTag(): PosTagContext {
		let localctx: PosTagContext = new PosTagContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, PqitaParser.RULE_posTag);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 92;
			this.match(PqitaParser.T__14);
			this.state = 93;
			this.match(PqitaParser.POS_TYPE);
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
			this.state = 95;
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
	public locationOrRelation(): LocationOrRelationContext {
		let localctx: LocationOrRelationContext = new LocationOrRelationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, PqitaParser.RULE_locationOrRelation);
		let _la: number;
		try {
			this.state = 102;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 97;
				this.location();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 98;
				this.relation();
				this.state = 100;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 162816) !== 0)) {
					{
					this.state = 99;
					this.recursiveExpression();
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
	public location(): LocationContext {
		let localctx: LocationContext = new LocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, PqitaParser.RULE_location);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 105;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===16) {
				{
				this.state = 104;
				this.negation();
				}
			}

			this.state = 107;
			this.match(PqitaParser.LOC_TYPE);
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
		this.enterRule(localctx, 30, PqitaParser.RULE_relation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 110;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===16) {
				{
				this.state = 109;
				this.negation();
				}
			}

			this.state = 112;
			this.match(PqitaParser.REL_TYPE);
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
	public recursiveExpression(): RecursiveExpressionContext {
		let localctx: RecursiveExpressionContext = new RecursiveExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, PqitaParser.RULE_recursiveExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 114;
			this.itemOrSet();
			this.state = 116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===15) {
				{
				this.state = 115;
				this.posTag();
				}
			}

			this.state = 119;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===20) {
				{
				this.state = 118;
				this.styleTag();
				}
			}

			this.state = 122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6356992) !== 0)) {
				{
				this.state = 121;
				this.locationOrRelation();
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
	public negation(): NegationContext {
		let localctx: NegationContext = new NegationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, PqitaParser.RULE_negation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 124;
			this.match(PqitaParser.T__15);
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

	public static readonly _serializedATN: number[] = [4,1,24,127,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,1,0,3,0,38,8,0,1,0,1,0,3,0,42,8,0,1,0,3,0,45,8,0,1,0,3,0,48,8,0,1,
	1,1,1,1,2,1,2,3,2,54,8,2,1,3,3,3,57,8,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,3,4,
	66,8,4,1,5,1,5,3,5,70,8,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,3,6,80,8,6,1,
	7,3,7,83,8,7,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,11,1,12,1,12,
	1,13,1,13,1,13,3,13,101,8,13,3,13,103,8,13,1,14,3,14,106,8,14,1,14,1,14,
	1,15,3,15,111,8,15,1,15,1,15,1,16,1,16,3,16,117,8,16,1,16,3,16,120,8,16,
	1,16,3,16,123,8,16,1,17,1,17,1,17,0,0,18,0,2,4,6,8,10,12,14,16,18,20,22,
	24,26,28,30,32,34,0,3,1,0,8,9,1,0,10,12,1,0,13,14,129,0,37,1,0,0,0,2,49,
	1,0,0,0,4,53,1,0,0,0,6,56,1,0,0,0,8,65,1,0,0,0,10,67,1,0,0,0,12,79,1,0,
	0,0,14,82,1,0,0,0,16,86,1,0,0,0,18,88,1,0,0,0,20,90,1,0,0,0,22,92,1,0,0,
	0,24,95,1,0,0,0,26,102,1,0,0,0,28,105,1,0,0,0,30,110,1,0,0,0,32,114,1,0,
	0,0,34,124,1,0,0,0,36,38,3,2,1,0,37,36,1,0,0,0,37,38,1,0,0,0,38,39,1,0,
	0,0,39,41,3,4,2,0,40,42,3,22,11,0,41,40,1,0,0,0,41,42,1,0,0,0,42,44,1,0,
	0,0,43,45,3,24,12,0,44,43,1,0,0,0,44,45,1,0,0,0,45,47,1,0,0,0,46,48,3,26,
	13,0,47,46,1,0,0,0,47,48,1,0,0,0,48,1,1,0,0,0,49,50,5,1,0,0,50,3,1,0,0,
	0,51,54,3,6,3,0,52,54,3,10,5,0,53,51,1,0,0,0,53,52,1,0,0,0,54,5,1,0,0,0,
	55,57,3,18,9,0,56,55,1,0,0,0,56,57,1,0,0,0,57,58,1,0,0,0,58,59,5,17,0,0,
	59,60,3,8,4,0,60,7,1,0,0,0,61,62,3,12,6,0,62,63,5,23,0,0,63,66,1,0,0,0,
	64,66,5,23,0,0,65,61,1,0,0,0,65,64,1,0,0,0,66,9,1,0,0,0,67,69,3,20,10,0,
	68,70,3,18,9,0,69,68,1,0,0,0,69,70,1,0,0,0,70,71,1,0,0,0,71,72,5,18,0,0,
	72,11,1,0,0,0,73,80,5,2,0,0,74,80,5,3,0,0,75,80,5,4,0,0,76,80,5,5,0,0,77,
	80,5,6,0,0,78,80,3,14,7,0,79,73,1,0,0,0,79,74,1,0,0,0,79,75,1,0,0,0,79,
	76,1,0,0,0,79,77,1,0,0,0,79,78,1,0,0,0,80,13,1,0,0,0,81,83,3,16,8,0,82,
	81,1,0,0,0,82,83,1,0,0,0,83,84,1,0,0,0,84,85,5,7,0,0,85,15,1,0,0,0,86,87,
	7,0,0,0,87,17,1,0,0,0,88,89,7,1,0,0,89,19,1,0,0,0,90,91,7,2,0,0,91,21,1,
	0,0,0,92,93,5,15,0,0,93,94,5,19,0,0,94,23,1,0,0,0,95,96,5,20,0,0,96,25,
	1,0,0,0,97,103,3,28,14,0,98,100,3,30,15,0,99,101,3,32,16,0,100,99,1,0,0,
	0,100,101,1,0,0,0,101,103,1,0,0,0,102,97,1,0,0,0,102,98,1,0,0,0,103,27,
	1,0,0,0,104,106,3,34,17,0,105,104,1,0,0,0,105,106,1,0,0,0,106,107,1,0,0,
	0,107,108,5,21,0,0,108,29,1,0,0,0,109,111,3,34,17,0,110,109,1,0,0,0,110,
	111,1,0,0,0,111,112,1,0,0,0,112,113,5,22,0,0,113,31,1,0,0,0,114,116,3,4,
	2,0,115,117,3,22,11,0,116,115,1,0,0,0,116,117,1,0,0,0,117,119,1,0,0,0,118,
	120,3,24,12,0,119,118,1,0,0,0,119,120,1,0,0,0,120,122,1,0,0,0,121,123,3,
	26,13,0,122,121,1,0,0,0,122,123,1,0,0,0,123,33,1,0,0,0,124,125,5,16,0,0,
	125,35,1,0,0,0,17,37,41,44,47,53,56,65,69,79,82,100,102,105,110,116,119,
	122];

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
	public itemOrSet(): ItemOrSetContext {
		return this.getTypedRuleContext(ItemOrSetContext, 0) as ItemOrSetContext;
	}
	public verb(): VerbContext {
		return this.getTypedRuleContext(VerbContext, 0) as VerbContext;
	}
	public posTag(): PosTagContext {
		return this.getTypedRuleContext(PosTagContext, 0) as PosTagContext;
	}
	public styleTag(): StyleTagContext {
		return this.getTypedRuleContext(StyleTagContext, 0) as StyleTagContext;
	}
	public locationOrRelation(): LocationOrRelationContext {
		return this.getTypedRuleContext(LocationOrRelationContext, 0) as LocationOrRelationContext;
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


export class VerbContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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


export class ItemOrSetContext extends ParserRuleContext {
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
    	return PqitaParser.RULE_itemOrSet;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterItemOrSet) {
	 		listener.enterItemOrSet(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitItemOrSet) {
	 		listener.exitItemOrSet(this);
		}
	}
}


export class ItemContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ITEM(): TerminalNode {
		return this.getToken(PqitaParser.ITEM, 0);
	}
	public itemContinuation(): ItemContinuationContext {
		return this.getTypedRuleContext(ItemContinuationContext, 0) as ItemContinuationContext;
	}
	public article(): ArticleContext {
		return this.getTypedRuleContext(ArticleContext, 0) as ArticleContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_item;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterItem) {
	 		listener.enterItem(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitItem) {
	 		listener.exitItem(this);
		}
	}
}


export class ItemContinuationContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public operator(): OperatorContext {
		return this.getTypedRuleContext(OperatorContext, 0) as OperatorContext;
	}
	public VALUE(): TerminalNode {
		return this.getToken(PqitaParser.VALUE, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_itemContinuation;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterItemContinuation) {
	 		listener.enterItemContinuation(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitItemContinuation) {
	 		listener.exitItemContinuation(this);
		}
	}
}


export class SetContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public quantifier(): QuantifierContext {
		return this.getTypedRuleContext(QuantifierContext, 0) as QuantifierContext;
	}
	public SET_TYPE(): TerminalNode {
		return this.getToken(PqitaParser.SET_TYPE, 0);
	}
	public article(): ArticleContext {
		return this.getTypedRuleContext(ArticleContext, 0) as ArticleContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_set;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterSet) {
	 		listener.enterSet(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitSet) {
	 		listener.exitSet(this);
		}
	}
}


export class OperatorContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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
	public degree(): DegreeContext {
		return this.getTypedRuleContext(DegreeContext, 0) as DegreeContext;
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


export class DegreeContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_degree;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterDegree) {
	 		listener.enterDegree(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitDegree) {
	 		listener.exitDegree(this);
		}
	}
}


export class ArticleContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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


export class QuantifierContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_quantifier;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterQuantifier) {
	 		listener.enterQuantifier(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitQuantifier) {
	 		listener.exitQuantifier(this);
		}
	}
}


export class PosTagContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public POS_TYPE(): TerminalNode {
		return this.getToken(PqitaParser.POS_TYPE, 0);
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_posTag;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterPosTag) {
	 		listener.enterPosTag(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitPosTag) {
	 		listener.exitPosTag(this);
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


export class LocationOrRelationContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public location(): LocationContext {
		return this.getTypedRuleContext(LocationContext, 0) as LocationContext;
	}
	public relation(): RelationContext {
		return this.getTypedRuleContext(RelationContext, 0) as RelationContext;
	}
	public recursiveExpression(): RecursiveExpressionContext {
		return this.getTypedRuleContext(RecursiveExpressionContext, 0) as RecursiveExpressionContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_locationOrRelation;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterLocationOrRelation) {
	 		listener.enterLocationOrRelation(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitLocationOrRelation) {
	 		listener.exitLocationOrRelation(this);
		}
	}
}


export class LocationContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LOC_TYPE(): TerminalNode {
		return this.getToken(PqitaParser.LOC_TYPE, 0);
	}
	public negation(): NegationContext {
		return this.getTypedRuleContext(NegationContext, 0) as NegationContext;
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
	public REL_TYPE(): TerminalNode {
		return this.getToken(PqitaParser.REL_TYPE, 0);
	}
	public negation(): NegationContext {
		return this.getTypedRuleContext(NegationContext, 0) as NegationContext;
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


export class RecursiveExpressionContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public itemOrSet(): ItemOrSetContext {
		return this.getTypedRuleContext(ItemOrSetContext, 0) as ItemOrSetContext;
	}
	public posTag(): PosTagContext {
		return this.getTypedRuleContext(PosTagContext, 0) as PosTagContext;
	}
	public styleTag(): StyleTagContext {
		return this.getTypedRuleContext(StyleTagContext, 0) as StyleTagContext;
	}
	public locationOrRelation(): LocationOrRelationContext {
		return this.getTypedRuleContext(LocationOrRelationContext, 0) as LocationOrRelationContext;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_recursiveExpression;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterRecursiveExpression) {
	 		listener.enterRecursiveExpression(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitRecursiveExpression) {
	 		listener.exitRecursiveExpression(this);
		}
	}
}


export class NegationContext extends ParserRuleContext {
	constructor(parser?: PqitaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PqitaParser.RULE_negation;
	}
	public enterRule(listener: pqitaListener): void {
	    if(listener.enterNegation) {
	 		listener.enterNegation(this);
		}
	}
	public exitRule(listener: pqitaListener): void {
	    if(listener.exitNegation) {
	 		listener.exitNegation(this);
		}
	}
}
