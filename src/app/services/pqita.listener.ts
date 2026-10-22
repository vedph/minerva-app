// Generated from pqita.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { ExpressionContext } from "./pqita.parser.js";
import { QueryContext } from "./pqita.parser.js";
import { VerbContext } from "./pqita.parser.js";
import { SubjectContext } from "./pqita.parser.js";
import { WordItemContext } from "./pqita.parser.js";
import { LemmaItemContext } from "./pqita.parser.js";
import { ForeignItemContext } from "./pqita.parser.js";
import { LocutionItemContext } from "./pqita.parser.js";
import { WordSetContext } from "./pqita.parser.js";
import { ForeignSetContext } from "./pqita.parser.js";
import { LocutionSetContext } from "./pqita.parser.js";
import { ArticleContext } from "./pqita.parser.js";
import { ValueSpecContext } from "./pqita.parser.js";
import { OperatorContext } from "./pqita.parser.js";
import { SimilarityContext } from "./pqita.parser.js";
import { FeaturesContext } from "./pqita.parser.js";
import { PosTagsContext } from "./pqita.parser.js";
import { StyleTagContext } from "./pqita.parser.js";
import { LocationContext } from "./pqita.parser.js";
import { RelationContext } from "./pqita.parser.js";
import { RelOpContext } from "./pqita.parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `pqitaParser`.
 */
export default class PqitaListener extends ParseTreeListener {
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
	 * Enter a parse tree produced by `pqitaParser.query`.
	 * @param ctx the parse tree
	 */
	enterQuery?: (ctx: QueryContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.query`.
	 * @param ctx the parse tree
	 */
	exitQuery?: (ctx: QueryContext) => void;
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
	 * Enter a parse tree produced by `pqitaParser.subject`.
	 * @param ctx the parse tree
	 */
	enterSubject?: (ctx: SubjectContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.subject`.
	 * @param ctx the parse tree
	 */
	exitSubject?: (ctx: SubjectContext) => void;
	/**
	 * Enter a parse tree produced by the `wordItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	enterWordItem?: (ctx: WordItemContext) => void;
	/**
	 * Exit a parse tree produced by the `wordItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	exitWordItem?: (ctx: WordItemContext) => void;
	/**
	 * Enter a parse tree produced by the `lemmaItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	enterLemmaItem?: (ctx: LemmaItemContext) => void;
	/**
	 * Exit a parse tree produced by the `lemmaItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	exitLemmaItem?: (ctx: LemmaItemContext) => void;
	/**
	 * Enter a parse tree produced by the `foreignItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	enterForeignItem?: (ctx: ForeignItemContext) => void;
	/**
	 * Exit a parse tree produced by the `foreignItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	exitForeignItem?: (ctx: ForeignItemContext) => void;
	/**
	 * Enter a parse tree produced by the `locutionItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	enterLocutionItem?: (ctx: LocutionItemContext) => void;
	/**
	 * Exit a parse tree produced by the `locutionItem`
	 * labeled alternative in `pqitaParser.item`.
	 * @param ctx the parse tree
	 */
	exitLocutionItem?: (ctx: LocutionItemContext) => void;
	/**
	 * Enter a parse tree produced by the `wordSet`
	 * labeled alternative in `pqitaParser.set`.
	 * @param ctx the parse tree
	 */
	enterWordSet?: (ctx: WordSetContext) => void;
	/**
	 * Exit a parse tree produced by the `wordSet`
	 * labeled alternative in `pqitaParser.set`.
	 * @param ctx the parse tree
	 */
	exitWordSet?: (ctx: WordSetContext) => void;
	/**
	 * Enter a parse tree produced by the `foreignSet`
	 * labeled alternative in `pqitaParser.set`.
	 * @param ctx the parse tree
	 */
	enterForeignSet?: (ctx: ForeignSetContext) => void;
	/**
	 * Exit a parse tree produced by the `foreignSet`
	 * labeled alternative in `pqitaParser.set`.
	 * @param ctx the parse tree
	 */
	exitForeignSet?: (ctx: ForeignSetContext) => void;
	/**
	 * Enter a parse tree produced by the `locutionSet`
	 * labeled alternative in `pqitaParser.set`.
	 * @param ctx the parse tree
	 */
	enterLocutionSet?: (ctx: LocutionSetContext) => void;
	/**
	 * Exit a parse tree produced by the `locutionSet`
	 * labeled alternative in `pqitaParser.set`.
	 * @param ctx the parse tree
	 */
	exitLocutionSet?: (ctx: LocutionSetContext) => void;
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
	 * Enter a parse tree produced by `pqitaParser.valueSpec`.
	 * @param ctx the parse tree
	 */
	enterValueSpec?: (ctx: ValueSpecContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.valueSpec`.
	 * @param ctx the parse tree
	 */
	exitValueSpec?: (ctx: ValueSpecContext) => void;
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
	 * Enter a parse tree produced by `pqitaParser.features`.
	 * @param ctx the parse tree
	 */
	enterFeatures?: (ctx: FeaturesContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.features`.
	 * @param ctx the parse tree
	 */
	exitFeatures?: (ctx: FeaturesContext) => void;
	/**
	 * Enter a parse tree produced by `pqitaParser.posTags`.
	 * @param ctx the parse tree
	 */
	enterPosTags?: (ctx: PosTagsContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.posTags`.
	 * @param ctx the parse tree
	 */
	exitPosTags?: (ctx: PosTagsContext) => void;
	/**
	 * Enter a parse tree produced by `pqitaParser.styleTag`.
	 * @param ctx the parse tree
	 */
	enterStyleTag?: (ctx: StyleTagContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.styleTag`.
	 * @param ctx the parse tree
	 */
	exitStyleTag?: (ctx: StyleTagContext) => void;
	/**
	 * Enter a parse tree produced by `pqitaParser.location`.
	 * @param ctx the parse tree
	 */
	enterLocation?: (ctx: LocationContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.location`.
	 * @param ctx the parse tree
	 */
	exitLocation?: (ctx: LocationContext) => void;
	/**
	 * Enter a parse tree produced by `pqitaParser.relation`.
	 * @param ctx the parse tree
	 */
	enterRelation?: (ctx: RelationContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.relation`.
	 * @param ctx the parse tree
	 */
	exitRelation?: (ctx: RelationContext) => void;
	/**
	 * Enter a parse tree produced by `pqitaParser.relOp`.
	 * @param ctx the parse tree
	 */
	enterRelOp?: (ctx: RelOpContext) => void;
	/**
	 * Exit a parse tree produced by `pqitaParser.relOp`.
	 * @param ctx the parse tree
	 */
	exitRelOp?: (ctx: RelOpContext) => void;
}

