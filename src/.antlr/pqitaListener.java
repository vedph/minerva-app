// Generated from d:/Projects/Pythia/minerva-app/src/pqita.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link pqitaParser}.
 */
public interface pqitaListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link pqitaParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(pqitaParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(pqitaParser.ExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#verb}.
	 * @param ctx the parse tree
	 */
	void enterVerb(pqitaParser.VerbContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#verb}.
	 * @param ctx the parse tree
	 */
	void exitVerb(pqitaParser.VerbContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#itemOrSet}.
	 * @param ctx the parse tree
	 */
	void enterItemOrSet(pqitaParser.ItemOrSetContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#itemOrSet}.
	 * @param ctx the parse tree
	 */
	void exitItemOrSet(pqitaParser.ItemOrSetContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#item}.
	 * @param ctx the parse tree
	 */
	void enterItem(pqitaParser.ItemContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#item}.
	 * @param ctx the parse tree
	 */
	void exitItem(pqitaParser.ItemContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#itemContinuation}.
	 * @param ctx the parse tree
	 */
	void enterItemContinuation(pqitaParser.ItemContinuationContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#itemContinuation}.
	 * @param ctx the parse tree
	 */
	void exitItemContinuation(pqitaParser.ItemContinuationContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#set}.
	 * @param ctx the parse tree
	 */
	void enterSet(pqitaParser.SetContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#set}.
	 * @param ctx the parse tree
	 */
	void exitSet(pqitaParser.SetContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#operator}.
	 * @param ctx the parse tree
	 */
	void enterOperator(pqitaParser.OperatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#operator}.
	 * @param ctx the parse tree
	 */
	void exitOperator(pqitaParser.OperatorContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#similarity}.
	 * @param ctx the parse tree
	 */
	void enterSimilarity(pqitaParser.SimilarityContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#similarity}.
	 * @param ctx the parse tree
	 */
	void exitSimilarity(pqitaParser.SimilarityContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#degree}.
	 * @param ctx the parse tree
	 */
	void enterDegree(pqitaParser.DegreeContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#degree}.
	 * @param ctx the parse tree
	 */
	void exitDegree(pqitaParser.DegreeContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#article}.
	 * @param ctx the parse tree
	 */
	void enterArticle(pqitaParser.ArticleContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#article}.
	 * @param ctx the parse tree
	 */
	void exitArticle(pqitaParser.ArticleContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#quantifier}.
	 * @param ctx the parse tree
	 */
	void enterQuantifier(pqitaParser.QuantifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#quantifier}.
	 * @param ctx the parse tree
	 */
	void exitQuantifier(pqitaParser.QuantifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#posTag}.
	 * @param ctx the parse tree
	 */
	void enterPosTag(pqitaParser.PosTagContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#posTag}.
	 * @param ctx the parse tree
	 */
	void exitPosTag(pqitaParser.PosTagContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#styleTag}.
	 * @param ctx the parse tree
	 */
	void enterStyleTag(pqitaParser.StyleTagContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#styleTag}.
	 * @param ctx the parse tree
	 */
	void exitStyleTag(pqitaParser.StyleTagContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#locationOrRelation}.
	 * @param ctx the parse tree
	 */
	void enterLocationOrRelation(pqitaParser.LocationOrRelationContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#locationOrRelation}.
	 * @param ctx the parse tree
	 */
	void exitLocationOrRelation(pqitaParser.LocationOrRelationContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#location}.
	 * @param ctx the parse tree
	 */
	void enterLocation(pqitaParser.LocationContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#location}.
	 * @param ctx the parse tree
	 */
	void exitLocation(pqitaParser.LocationContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#relation}.
	 * @param ctx the parse tree
	 */
	void enterRelation(pqitaParser.RelationContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#relation}.
	 * @param ctx the parse tree
	 */
	void exitRelation(pqitaParser.RelationContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#recursiveExpression}.
	 * @param ctx the parse tree
	 */
	void enterRecursiveExpression(pqitaParser.RecursiveExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#recursiveExpression}.
	 * @param ctx the parse tree
	 */
	void exitRecursiveExpression(pqitaParser.RecursiveExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link pqitaParser#negation}.
	 * @param ctx the parse tree
	 */
	void enterNegation(pqitaParser.NegationContext ctx);
	/**
	 * Exit a parse tree produced by {@link pqitaParser#negation}.
	 * @param ctx the parse tree
	 */
	void exitNegation(pqitaParser.NegationContext ctx);
}