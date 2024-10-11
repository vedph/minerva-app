// Generated from d:/Projects/Pythia/minerva/src/pqita.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class pqitaParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, ITEM=17, 
		SET_TYPE=18, POS_TYPE=19, STYLE_TYPE=20, LOC_TYPE=21, REL_TYPE=22, VALUE=23, 
		WS=24;
	public static final int
		RULE_expression = 0, RULE_verb = 1, RULE_itemOrSet = 2, RULE_item = 3, 
		RULE_itemContinuation = 4, RULE_set = 5, RULE_operator = 6, RULE_similarity = 7, 
		RULE_degree = 8, RULE_article = 9, RULE_quantifier = 10, RULE_posTag = 11, 
		RULE_styleTag = 12, RULE_locationOrRelation = 13, RULE_location = 14, 
		RULE_relation = 15, RULE_recursiveExpression = 16, RULE_negation = 17;
	private static String[] makeRuleNames() {
		return new String[] {
			"expression", "verb", "itemOrSet", "item", "itemContinuation", "set", 
			"operator", "similarity", "degree", "article", "quantifier", "posTag", 
			"styleTag", "locationOrRelation", "location", "relation", "recursiveExpression", 
			"negation"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'trova'", "'uguale a'", "'iniziante per'", "'terminante per'", 
			"'contenente'", "'corrispondente a'", "'simile a'", "'molto'", "'poco'", 
			"'la'", "'il'", "'l''", "'tutte'", "'tutti'", "'come'", "'non'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, "ITEM", "SET_TYPE", "POS_TYPE", "STYLE_TYPE", 
			"LOC_TYPE", "REL_TYPE", "VALUE", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "pqita.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public pqitaParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionContext extends ParserRuleContext {
		public ItemOrSetContext itemOrSet() {
			return getRuleContext(ItemOrSetContext.class,0);
		}
		public VerbContext verb() {
			return getRuleContext(VerbContext.class,0);
		}
		public PosTagContext posTag() {
			return getRuleContext(PosTagContext.class,0);
		}
		public StyleTagContext styleTag() {
			return getRuleContext(StyleTagContext.class,0);
		}
		public LocationOrRelationContext locationOrRelation() {
			return getRuleContext(LocationOrRelationContext.class,0);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	}

	public final ExpressionContext expression() throws RecognitionException {
		ExpressionContext _localctx = new ExpressionContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_expression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(37);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0) {
				{
				setState(36);
				verb();
				}
			}

			setState(39);
			itemOrSet();
			setState(41);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__14) {
				{
				setState(40);
				posTag();
				}
			}

			setState(44);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STYLE_TYPE) {
				{
				setState(43);
				styleTag();
				}
			}

			setState(47);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 6356992L) != 0)) {
				{
				setState(46);
				locationOrRelation();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VerbContext extends ParserRuleContext {
		public VerbContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_verb; }
	}

	public final VerbContext verb() throws RecognitionException {
		VerbContext _localctx = new VerbContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_verb);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(49);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ItemOrSetContext extends ParserRuleContext {
		public ItemContext item() {
			return getRuleContext(ItemContext.class,0);
		}
		public SetContext set() {
			return getRuleContext(SetContext.class,0);
		}
		public ItemOrSetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_itemOrSet; }
	}

	public final ItemOrSetContext itemOrSet() throws RecognitionException {
		ItemOrSetContext _localctx = new ItemOrSetContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_itemOrSet);
		try {
			setState(53);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__9:
			case T__10:
			case T__11:
			case ITEM:
				enterOuterAlt(_localctx, 1);
				{
				setState(51);
				item();
				}
				break;
			case T__12:
			case T__13:
				enterOuterAlt(_localctx, 2);
				{
				setState(52);
				set();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ItemContext extends ParserRuleContext {
		public TerminalNode ITEM() { return getToken(pqitaParser.ITEM, 0); }
		public ItemContinuationContext itemContinuation() {
			return getRuleContext(ItemContinuationContext.class,0);
		}
		public ArticleContext article() {
			return getRuleContext(ArticleContext.class,0);
		}
		public ItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_item; }
	}

	public final ItemContext item() throws RecognitionException {
		ItemContext _localctx = new ItemContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_item);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(56);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 7168L) != 0)) {
				{
				setState(55);
				article();
				}
			}

			setState(58);
			match(ITEM);
			setState(59);
			itemContinuation();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ItemContinuationContext extends ParserRuleContext {
		public OperatorContext operator() {
			return getRuleContext(OperatorContext.class,0);
		}
		public TerminalNode VALUE() { return getToken(pqitaParser.VALUE, 0); }
		public ItemContinuationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_itemContinuation; }
	}

	public final ItemContinuationContext itemContinuation() throws RecognitionException {
		ItemContinuationContext _localctx = new ItemContinuationContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_itemContinuation);
		try {
			setState(65);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__5:
			case T__6:
			case T__7:
			case T__8:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(61);
				operator();
				setState(62);
				match(VALUE);
				}
				}
				break;
			case VALUE:
				enterOuterAlt(_localctx, 2);
				{
				setState(64);
				match(VALUE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SetContext extends ParserRuleContext {
		public QuantifierContext quantifier() {
			return getRuleContext(QuantifierContext.class,0);
		}
		public TerminalNode SET_TYPE() { return getToken(pqitaParser.SET_TYPE, 0); }
		public ArticleContext article() {
			return getRuleContext(ArticleContext.class,0);
		}
		public SetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_set; }
	}

	public final SetContext set() throws RecognitionException {
		SetContext _localctx = new SetContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_set);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(67);
			quantifier();
			setState(69);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 7168L) != 0)) {
				{
				setState(68);
				article();
				}
			}

			setState(71);
			match(SET_TYPE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class OperatorContext extends ParserRuleContext {
		public SimilarityContext similarity() {
			return getRuleContext(SimilarityContext.class,0);
		}
		public OperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_operator; }
	}

	public final OperatorContext operator() throws RecognitionException {
		OperatorContext _localctx = new OperatorContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_operator);
		try {
			setState(79);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				enterOuterAlt(_localctx, 1);
				{
				setState(73);
				match(T__1);
				}
				break;
			case T__2:
				enterOuterAlt(_localctx, 2);
				{
				setState(74);
				match(T__2);
				}
				break;
			case T__3:
				enterOuterAlt(_localctx, 3);
				{
				setState(75);
				match(T__3);
				}
				break;
			case T__4:
				enterOuterAlt(_localctx, 4);
				{
				setState(76);
				match(T__4);
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 5);
				{
				setState(77);
				match(T__5);
				}
				break;
			case T__6:
			case T__7:
			case T__8:
				enterOuterAlt(_localctx, 6);
				{
				setState(78);
				similarity();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SimilarityContext extends ParserRuleContext {
		public DegreeContext degree() {
			return getRuleContext(DegreeContext.class,0);
		}
		public SimilarityContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_similarity; }
	}

	public final SimilarityContext similarity() throws RecognitionException {
		SimilarityContext _localctx = new SimilarityContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_similarity);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(82);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__7 || _la==T__8) {
				{
				setState(81);
				degree();
				}
			}

			setState(84);
			match(T__6);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DegreeContext extends ParserRuleContext {
		public DegreeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_degree; }
	}

	public final DegreeContext degree() throws RecognitionException {
		DegreeContext _localctx = new DegreeContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_degree);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(86);
			_la = _input.LA(1);
			if ( !(_la==T__7 || _la==T__8) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArticleContext extends ParserRuleContext {
		public ArticleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_article; }
	}

	public final ArticleContext article() throws RecognitionException {
		ArticleContext _localctx = new ArticleContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_article);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(88);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 7168L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class QuantifierContext extends ParserRuleContext {
		public QuantifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_quantifier; }
	}

	public final QuantifierContext quantifier() throws RecognitionException {
		QuantifierContext _localctx = new QuantifierContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_quantifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(90);
			_la = _input.LA(1);
			if ( !(_la==T__12 || _la==T__13) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PosTagContext extends ParserRuleContext {
		public TerminalNode POS_TYPE() { return getToken(pqitaParser.POS_TYPE, 0); }
		public PosTagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_posTag; }
	}

	public final PosTagContext posTag() throws RecognitionException {
		PosTagContext _localctx = new PosTagContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_posTag);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(92);
			match(T__14);
			setState(93);
			match(POS_TYPE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StyleTagContext extends ParserRuleContext {
		public TerminalNode STYLE_TYPE() { return getToken(pqitaParser.STYLE_TYPE, 0); }
		public StyleTagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_styleTag; }
	}

	public final StyleTagContext styleTag() throws RecognitionException {
		StyleTagContext _localctx = new StyleTagContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_styleTag);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(95);
			match(STYLE_TYPE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LocationOrRelationContext extends ParserRuleContext {
		public LocationContext location() {
			return getRuleContext(LocationContext.class,0);
		}
		public RelationContext relation() {
			return getRuleContext(RelationContext.class,0);
		}
		public RecursiveExpressionContext recursiveExpression() {
			return getRuleContext(RecursiveExpressionContext.class,0);
		}
		public LocationOrRelationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_locationOrRelation; }
	}

	public final LocationOrRelationContext locationOrRelation() throws RecognitionException {
		LocationOrRelationContext _localctx = new LocationOrRelationContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_locationOrRelation);
		int _la;
		try {
			setState(102);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(97);
				location();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(98);
				relation();
				setState(100);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 162816L) != 0)) {
					{
					setState(99);
					recursiveExpression();
					}
				}

				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LocationContext extends ParserRuleContext {
		public TerminalNode LOC_TYPE() { return getToken(pqitaParser.LOC_TYPE, 0); }
		public NegationContext negation() {
			return getRuleContext(NegationContext.class,0);
		}
		public LocationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_location; }
	}

	public final LocationContext location() throws RecognitionException {
		LocationContext _localctx = new LocationContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_location);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(105);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__15) {
				{
				setState(104);
				negation();
				}
			}

			setState(107);
			match(LOC_TYPE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RelationContext extends ParserRuleContext {
		public TerminalNode REL_TYPE() { return getToken(pqitaParser.REL_TYPE, 0); }
		public NegationContext negation() {
			return getRuleContext(NegationContext.class,0);
		}
		public RelationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_relation; }
	}

	public final RelationContext relation() throws RecognitionException {
		RelationContext _localctx = new RelationContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_relation);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(110);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__15) {
				{
				setState(109);
				negation();
				}
			}

			setState(112);
			match(REL_TYPE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RecursiveExpressionContext extends ParserRuleContext {
		public ItemOrSetContext itemOrSet() {
			return getRuleContext(ItemOrSetContext.class,0);
		}
		public PosTagContext posTag() {
			return getRuleContext(PosTagContext.class,0);
		}
		public StyleTagContext styleTag() {
			return getRuleContext(StyleTagContext.class,0);
		}
		public LocationOrRelationContext locationOrRelation() {
			return getRuleContext(LocationOrRelationContext.class,0);
		}
		public RecursiveExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recursiveExpression; }
	}

	public final RecursiveExpressionContext recursiveExpression() throws RecognitionException {
		RecursiveExpressionContext _localctx = new RecursiveExpressionContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_recursiveExpression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(114);
			itemOrSet();
			setState(116);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__14) {
				{
				setState(115);
				posTag();
				}
			}

			setState(119);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STYLE_TYPE) {
				{
				setState(118);
				styleTag();
				}
			}

			setState(122);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 6356992L) != 0)) {
				{
				setState(121);
				locationOrRelation();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NegationContext extends ParserRuleContext {
		public NegationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_negation; }
	}

	public final NegationContext negation() throws RecognitionException {
		NegationContext _localctx = new NegationContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_negation);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(124);
			match(T__15);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001\u0018\u007f\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001"+
		"\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004"+
		"\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007"+
		"\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b"+
		"\u0002\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007"+
		"\u000f\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0001\u0000\u0003"+
		"\u0000&\b\u0000\u0001\u0000\u0001\u0000\u0003\u0000*\b\u0000\u0001\u0000"+
		"\u0003\u0000-\b\u0000\u0001\u0000\u0003\u00000\b\u0000\u0001\u0001\u0001"+
		"\u0001\u0001\u0002\u0001\u0002\u0003\u00026\b\u0002\u0001\u0003\u0003"+
		"\u00039\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0003\u0004B\b\u0004\u0001\u0005\u0001"+
		"\u0005\u0003\u0005F\b\u0005\u0001\u0005\u0001\u0005\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0003\u0006P\b"+
		"\u0006\u0001\u0007\u0003\u0007S\b\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\b\u0001\b\u0001\t\u0001\t\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0001"+
		"\u000b\u0001\f\u0001\f\u0001\r\u0001\r\u0001\r\u0003\re\b\r\u0003\rg\b"+
		"\r\u0001\u000e\u0003\u000ej\b\u000e\u0001\u000e\u0001\u000e\u0001\u000f"+
		"\u0003\u000fo\b\u000f\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010"+
		"\u0003\u0010u\b\u0010\u0001\u0010\u0003\u0010x\b\u0010\u0001\u0010\u0003"+
		"\u0010{\b\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0000\u0000\u0012"+
		"\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a"+
		"\u001c\u001e \"\u0000\u0003\u0001\u0000\b\t\u0001\u0000\n\f\u0001\u0000"+
		"\r\u000e\u0081\u0000%\u0001\u0000\u0000\u0000\u00021\u0001\u0000\u0000"+
		"\u0000\u00045\u0001\u0000\u0000\u0000\u00068\u0001\u0000\u0000\u0000\b"+
		"A\u0001\u0000\u0000\u0000\nC\u0001\u0000\u0000\u0000\fO\u0001\u0000\u0000"+
		"\u0000\u000eR\u0001\u0000\u0000\u0000\u0010V\u0001\u0000\u0000\u0000\u0012"+
		"X\u0001\u0000\u0000\u0000\u0014Z\u0001\u0000\u0000\u0000\u0016\\\u0001"+
		"\u0000\u0000\u0000\u0018_\u0001\u0000\u0000\u0000\u001af\u0001\u0000\u0000"+
		"\u0000\u001ci\u0001\u0000\u0000\u0000\u001en\u0001\u0000\u0000\u0000 "+
		"r\u0001\u0000\u0000\u0000\"|\u0001\u0000\u0000\u0000$&\u0003\u0002\u0001"+
		"\u0000%$\u0001\u0000\u0000\u0000%&\u0001\u0000\u0000\u0000&\'\u0001\u0000"+
		"\u0000\u0000\')\u0003\u0004\u0002\u0000(*\u0003\u0016\u000b\u0000)(\u0001"+
		"\u0000\u0000\u0000)*\u0001\u0000\u0000\u0000*,\u0001\u0000\u0000\u0000"+
		"+-\u0003\u0018\f\u0000,+\u0001\u0000\u0000\u0000,-\u0001\u0000\u0000\u0000"+
		"-/\u0001\u0000\u0000\u0000.0\u0003\u001a\r\u0000/.\u0001\u0000\u0000\u0000"+
		"/0\u0001\u0000\u0000\u00000\u0001\u0001\u0000\u0000\u000012\u0005\u0001"+
		"\u0000\u00002\u0003\u0001\u0000\u0000\u000036\u0003\u0006\u0003\u0000"+
		"46\u0003\n\u0005\u000053\u0001\u0000\u0000\u000054\u0001\u0000\u0000\u0000"+
		"6\u0005\u0001\u0000\u0000\u000079\u0003\u0012\t\u000087\u0001\u0000\u0000"+
		"\u000089\u0001\u0000\u0000\u00009:\u0001\u0000\u0000\u0000:;\u0005\u0011"+
		"\u0000\u0000;<\u0003\b\u0004\u0000<\u0007\u0001\u0000\u0000\u0000=>\u0003"+
		"\f\u0006\u0000>?\u0005\u0017\u0000\u0000?B\u0001\u0000\u0000\u0000@B\u0005"+
		"\u0017\u0000\u0000A=\u0001\u0000\u0000\u0000A@\u0001\u0000\u0000\u0000"+
		"B\t\u0001\u0000\u0000\u0000CE\u0003\u0014\n\u0000DF\u0003\u0012\t\u0000"+
		"ED\u0001\u0000\u0000\u0000EF\u0001\u0000\u0000\u0000FG\u0001\u0000\u0000"+
		"\u0000GH\u0005\u0012\u0000\u0000H\u000b\u0001\u0000\u0000\u0000IP\u0005"+
		"\u0002\u0000\u0000JP\u0005\u0003\u0000\u0000KP\u0005\u0004\u0000\u0000"+
		"LP\u0005\u0005\u0000\u0000MP\u0005\u0006\u0000\u0000NP\u0003\u000e\u0007"+
		"\u0000OI\u0001\u0000\u0000\u0000OJ\u0001\u0000\u0000\u0000OK\u0001\u0000"+
		"\u0000\u0000OL\u0001\u0000\u0000\u0000OM\u0001\u0000\u0000\u0000ON\u0001"+
		"\u0000\u0000\u0000P\r\u0001\u0000\u0000\u0000QS\u0003\u0010\b\u0000RQ"+
		"\u0001\u0000\u0000\u0000RS\u0001\u0000\u0000\u0000ST\u0001\u0000\u0000"+
		"\u0000TU\u0005\u0007\u0000\u0000U\u000f\u0001\u0000\u0000\u0000VW\u0007"+
		"\u0000\u0000\u0000W\u0011\u0001\u0000\u0000\u0000XY\u0007\u0001\u0000"+
		"\u0000Y\u0013\u0001\u0000\u0000\u0000Z[\u0007\u0002\u0000\u0000[\u0015"+
		"\u0001\u0000\u0000\u0000\\]\u0005\u000f\u0000\u0000]^\u0005\u0013\u0000"+
		"\u0000^\u0017\u0001\u0000\u0000\u0000_`\u0005\u0014\u0000\u0000`\u0019"+
		"\u0001\u0000\u0000\u0000ag\u0003\u001c\u000e\u0000bd\u0003\u001e\u000f"+
		"\u0000ce\u0003 \u0010\u0000dc\u0001\u0000\u0000\u0000de\u0001\u0000\u0000"+
		"\u0000eg\u0001\u0000\u0000\u0000fa\u0001\u0000\u0000\u0000fb\u0001\u0000"+
		"\u0000\u0000g\u001b\u0001\u0000\u0000\u0000hj\u0003\"\u0011\u0000ih\u0001"+
		"\u0000\u0000\u0000ij\u0001\u0000\u0000\u0000jk\u0001\u0000\u0000\u0000"+
		"kl\u0005\u0015\u0000\u0000l\u001d\u0001\u0000\u0000\u0000mo\u0003\"\u0011"+
		"\u0000nm\u0001\u0000\u0000\u0000no\u0001\u0000\u0000\u0000op\u0001\u0000"+
		"\u0000\u0000pq\u0005\u0016\u0000\u0000q\u001f\u0001\u0000\u0000\u0000"+
		"rt\u0003\u0004\u0002\u0000su\u0003\u0016\u000b\u0000ts\u0001\u0000\u0000"+
		"\u0000tu\u0001\u0000\u0000\u0000uw\u0001\u0000\u0000\u0000vx\u0003\u0018"+
		"\f\u0000wv\u0001\u0000\u0000\u0000wx\u0001\u0000\u0000\u0000xz\u0001\u0000"+
		"\u0000\u0000y{\u0003\u001a\r\u0000zy\u0001\u0000\u0000\u0000z{\u0001\u0000"+
		"\u0000\u0000{!\u0001\u0000\u0000\u0000|}\u0005\u0010\u0000\u0000}#\u0001"+
		"\u0000\u0000\u0000\u0011%),/58AEORdfintwz";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}