grammar pqita;

// PARSER RULES
expression:
	verb? itemOrSet posTag? styleTag? locationOrRelation?;

verb: 'trova';

itemOrSet: item | set;

item: article? ITEM itemContinuation;

itemContinuation: (operator VALUE) | VALUE;

set: quantifier article? SET_TYPE;

operator:
	'uguale a'
	| 'iniziante per'
	| 'terminante per'
	| 'contenente'
	| 'corrispondente a'
	| similarity;

similarity: degree? 'simile a';

degree: 'molto' | 'poco';

article: 'la' | 'il' | 'l\'';

quantifier: 'tutte' | 'tutti';

posTag: 'come' POS_TYPE;

styleTag: STYLE_TYPE;

locationOrRelation: location | relation recursiveExpression?;

location: negation? LOC_TYPE;

relation: negation? REL_TYPE;

recursiveExpression:
	itemOrSet posTag? styleTag? locationOrRelation?;

negation: 'non';

// LEXER RULES
ITEM:
	'parola'
	| 'locuzione'
	| 'lemma'
	| 'forestierismo'
	| 'anglicismo'
	| 'latinismo';

SET_TYPE: ('le' | 'i' | 'gli') WS (
		'parole'
		| 'forestierismi'
		| 'anglicismi'
		| 'latinismi'
	);

// UDP tags: ADJ ADP ADV AUX CCONJ DET NOUN NUM PRON PROPN SCONJ SYM VERB X
POS_TYPE:
	'aggettivo'
	| 'apposizione'
	| 'avverbio'
	| 'ausiliare'
	| 'congiunzione coordinante'
  | 'determinante'
	| 'sostantivo'
  | 'numero'
  | 'pronome'
  | 'nome proprio'
  | 'congiunzione subordinante'
  | 'simbolo'
  | 'verbo'
  | 'altro'
  // verbform
  | 'infinito'
  | 'gerundio'
  | 'participio'
  // mood
  | 'indicativo'
  | 'congiuntivo'
  | 'condizionale'
  | 'imperativo'
  // definite
  | 'modo definito'
  | 'modo indefinito'
  // tense
  | 'presente'
  | 'passato'
  | 'futuro'
  // person
  | 'prima persona'
  | 'seconda persona'
  | 'terza persona'
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
  // prontype
  | 'articolo'
  | 'pronome dimostrativo'
  | 'pronome indefinito'
  | 'pronome interrogativo'
  | 'pronome negativo'
  | 'pronome personale'
  | 'pronome relativo'
  | 'pronome totalizzante'
  // degree
  | 'comparativo'
  | 'superlativo';

STYLE_TYPE: 'in' WS ( 'grassetto' | 'corsivo' | 'sottolineato');

LOC_TYPE: ('a' WS)? ('inizio' | 'fine') WS 'di' WS 'frase';

REL_TYPE:
	'vicino a'
	| ('attaccato' | 'attaccata' | 'attaccati') WS 'a'
	| 'prima' WS ('di' | 'della' | 'del')
	| 'dopo' WS ('l\'' | 'la' | 'il');

VALUE: '"' ~["]* '"';

WS: [ \t\r\n]+ -> skip;
