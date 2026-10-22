grammar pqita;

// Pythia Query in ITAlian: a fixed sequence of Italian words translated
// into a Pythia query (see Pythia.Core/Assets/pythia.g4). Each sentence has:
// 1. an optional verb ("trova", "cerca");
// 2. a subject: a word, lemma, locution, foreign word, or a set of them,
//    with an optional value and optional grammatical/typographic features;
// 3. an optional location in the sentence ("a inizio di frase");
// 4. an optional relation with a second subject ("vicino alla parola..."),
//    which in turn can have its own location and relation.
// A location or relation always refers to the subject preceding it.

// PARSER RULES
expression: verb? query EOF;

query: subject location? relation?;

verb: VERB;

subject: item | set;

// a single object: "la parola", "il lemma", "la locuzione", "il latinismo"...
item:
	article? WORD (valueSpec features? | features)	# wordItem
	| article? LEMMA valueSpec features?			# lemmaItem
	| article? FOREIGN valueSpec? features?			# foreignItem
	| article? LOCUTION valueSpec?					# locutionItem;

// a set of objects: "tutte le parole", "i latinismi", "le locuzioni"...
set:
	QUANTIFIER? PLURAL_ARTICLE? WORDS features		# wordSet
	| QUANTIFIER? PLURAL_ARTICLE? FOREIGNS features?	# foreignSet
	| QUANTIFIER? PLURAL_ARTICLE? LOCUTIONS			# locutionSet;

article: ARTICLE;

valueSpec: operator? VALUE;

operator:
	EQ_OP
	| STARTS_OP
	| ENDS_OP
	| CONTAINS_OP
	| WILDCARDS_OP
	| similarity;

similarity: DEGREE? SIMILAR_OP;

features: posTags styleTag? | styleTag;

posTags: COME POS_TYPE+;

styleTag: STYLE_TYPE;

location: NEGATION? (LOC_START | LOC_END);

relation: NEGATION? relOp query;

relOp: NEAR_OP | ATTACHED_OP | BEFORE_OP | AFTER_OP;

// LEXER RULES
// Keywords come first, so that on equal length they win over UNKNOWN.

VERB: 'trova' | 'cerca';

ARTICLE: 'il' | 'lo' | 'la' | 'l\'' | 'un' | 'uno' | 'una' | 'un\'';

PLURAL_ARTICLE: 'i' | 'gli' | 'le';

QUANTIFIER: 'tutti' | 'tutte';

WORD: 'parola';
WORDS: 'parole';
LEMMA: 'lemma';
LOCUTION: 'locuzione';
LOCUTIONS: 'locuzioni';
FOREIGN: 'forestierismo' | 'anglicismo' | 'latinismo';
FOREIGNS: 'forestierismi' | 'anglicismi' | 'latinismi';

EQ_OP: 'uguale' WS 'a';
STARTS_OP: 'iniziante' WS ('per' | 'con');
ENDS_OP: 'terminante' WS ('per' | 'con' | 'in');
CONTAINS_OP: 'contenente';
WILDCARDS_OP: 'corrispondente' WS 'a';
SIMILAR_OP: 'simile' WS 'a';
DEGREE: 'molto' | 'poco';

COME: 'come';

// UDP tags: ADJ ADP ADV AUX CCONJ DET INTJ NOUN NUM PRON PROPN SCONJ SYM VERB X
POS_TYPE:
	'aggettivo'
	| 'preposizione'
	| 'apposizione' // legacy synonym of preposizione
	| 'avverbio'
	| 'ausiliare'
	| 'congiunzione' WS 'coordinante'
	| 'determinante'
	| 'interiezione'
	| 'sostantivo'
	| 'nome'
	| 'numero'
	| 'pronome'
	| 'nome' WS 'proprio'
	| 'congiunzione' WS 'subordinante'
	| 'simbolo'
	| 'verbo'
	| 'altro'
	// verbform
	| 'infinito'
	| 'gerundio'
	| 'participio'
	| 'modo' WS 'definito'
	| 'modo' WS 'indefinito'
	// mood
	| 'indicativo'
	| 'congiuntivo'
	| 'condizionale'
	| 'imperativo'
	// tense
	| 'presente'
	| 'imperfetto'
	| 'passato'
	| 'futuro'
	// person
	| 'prima' WS 'persona'
	| 'seconda' WS 'persona'
	| 'terza' WS 'persona'
	// number
	| 'singolare'
	| 'plurale'
	// gender
	| 'maschile'
	| 'femminile'
	// clitic
	| 'clitica'
	// poss
	| 'possessivo'
	// definite
	| 'articolo' WS 'determinativo'
	| 'articolo' WS 'indeterminativo'
	// prontype
	| 'articolo'
	| 'pronome' WS 'dimostrativo'
	| 'pronome' WS 'indefinito'
	| 'pronome' WS 'interrogativo'
	| 'pronome' WS 'negativo'
	| 'pronome' WS 'personale'
	| 'pronome' WS 'relativo'
	| 'pronome' WS 'totalizzante'
	// degree
	| 'comparativo'
	| 'superlativo';

STYLE_TYPE: 'in' WS ('grassetto' | 'corsivo' | 'sottolineato');

NEGATION: 'non';

LOC_START: (('a' | 'ad') WS | 'all\'' WS?)? 'inizio' WS (('di' | 'della') WS)? 'frase';
LOC_END: (('a' | 'alla') WS)? 'fine' WS (('di' | 'della') WS)? 'frase';

NEAR_OP: 'vicino' WS PREP_A;
ATTACHED_OP: 'attaccat' [oaie] WS PREP_A;
BEFORE_OP: 'prima' WS PREP_DI;
// no article here: it would swallow the start of e.g. "dopo latinismo"
AFTER_OP: 'dopo';

fragment PREP_A: 'a' | 'ad' | 'al' | 'allo' | 'alla' | 'all\'' | 'ai' | 'agli' | 'alle';
fragment PREP_DI: 'di' | 'del' | 'dello' | 'della' | 'dell\'' | 'dei' | 'degli' | 'delle';

VALUE: '"' ~["]* '"';

WS: [ \t\r\n]+ -> skip;

// Error tokens: never accepted by the parser, they turn lexical errors
// into syntax errors, which carry the expected tokens.
UNCLOSED_VALUE: '"' ~["]*;
UNKNOWN: ~[ \t\r\n"'.,;:!?]+;
ERROR_CHAR: .;
