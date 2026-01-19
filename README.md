# Minerva Frontend Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

🐋 Docker:

1. if you changed anything, run `pnpm run xi18n` to extract the messages and merge them with the existing translations if any. Then use Poedit or any other tool to add translations;
2. update version in `env.js` (and in Docker compose scripts);
3. `ng build --configuration=production`;
4. `docker build . -t vedph2020/minerva-app:3.0.1 -t vedph2020/minerva-app:latest` (replace with the current version).

>Note that the default production language for Minerva images is Italian.

## Localization

To update messages: `npm run xi18n` and use Poedit to edit `messages.it.xlf`.

## Deployment

For local deployment with database, follow these instructions according to your OS.

- **Windows**:

1. create directory:

    ```ps1
    md -Force "C:\data"
    ```

2. download ZIP (change the example URL as required):

    ```ps1
    Invoke-WebRequest -Uri "http://www.fusisoft.it/xfer/minerva-bin.zip" -OutFile "C:\data\minerva-bin.zip"
    ```

3. unzip the downloaded ZIP and remove it:

    ```ps1
    Expand-Archive -Path "C:\data\minerva-bin.zip" -DestinationPath "C:\data" -Force
    Remove-Item "C:\data\minerva-bin.zip" -Force
    ```

4. ensure your compose script has a bound volume for data:

```yml
    environment:
      # ...
      # unzip bin files from DB into host opt/dump to restore the DB
      - DATA__SOURCEDIR=/opt/dump/
    volumes:
      - type: bind
        source: 'c:/data'
        target: '/opt/dump'
```

- **Ubuntu**/**MacOS**:

1. create directory (`-p` creates parent directories if they don't exist):

    ```sh
    sudo mkdir -p /opt/dump
    ```

2. download ZIP (the `-L` option for `curl` follows redirects; the `-O` option for `wget` and `curl` specifies the output file):

    ```sh
    sudo curl -L http://www.fusisoft.it/xfer/minerva-bin.zip -o /opt/dump/minerva-bin.zip
    # OR
    sudo wget http://www.fusisoft.it/xfer/minerva-bin.zip -O /opt/dump/minerva-bin.zip
    ```

3. unzip the downloaded ZIP and remove it:

    ```sh
    sudo unzip /opt/dump/minerva-bin.zip -d /opt/dump
    sudo rm /opt/dump/minerva-bin.zip
    ```

4. ensure your compose script has a bound volume for data:

```yml
    environment:
      # ...
      # unzip bin files from DB into host opt/dump to restore the DB
      - DATA__SOURCEDIR=/opt/dump/
    volumes:
      # host:container
      - /opt/dump:/opt/dump
```

## Static Pages

Source document: <https://docs.google.com/document/d/12yXGM6TPunSVkkMUiW7ejtkqc0GaAPr8OJZAKnUGLZg/edit?usp=sharing>

## Higher Order Query DSL

Minerva uses the [Pythia search engine](https://vedph.github.io/pythia-doc). The [Pythia query language DSL](https://vedph.github.io/pythia-doc/query.html) is very powerful, but for some audiences it might just be too much. This is the case for a part of the audience targeted by this Minerva frontend, built for the [Atti Chiari](https://attichiari.unige.it) project, which addresses not only linguists and jurists, but also a broader public of non-specialized users.

In the case of Minerva, a **new query layer** has been added on top of the existing one, acting as an alternative, "simple" query language, as opposed to the default one. This is just another DSL, targeting an Italian audience and much nearer to natural language expression.

In this DSL, users just build some predefined Italian sentences to query the corpus. Apart from the simplest, one-word query, which just corresponds to the word you want to find, Figure 1 shows the various paths which can be followed to build a sentence, from left to right.

![Minerva DSL](public/img/pqita.png)

- Figure 1 - The Minerva additional DSL

1. users can start from "trova" and then pick an object, like "parola", "locuzione", "lemma", "forestierismo", "latinismo", "anglicismo" on one branch, or "tutte le parole", "tutti i forestierismi", "tutti i latinismi", "tutti gli anglicismi" on another one. The former branch allows to specify expressions corresponding to comparison operators, like "iniziante per", "terminante per", "contenente", "corrispondente a" (for wildcard matches), or "(molto/poco) simile a" for fuzzy matches; these are then followed by the value being compared.

2. then, both branches converge in the optional "come" clause, which introduces search criteria derived from POS tagging, like noun, adjective, verb, one of its specific moods or tenses, etc.

3. optionally, this can be followed by an "in" clause, which adds search criteria related to typographic features (extracted from the original DOCX documents), like bold, italic, or underline.

4. finally, we can add a positional clause, like at sentence start or end, or near to, attached to (=near with zero distance), before, or after, which in turn can be followed by yet another expression like that introduced by "trova", in a recursive way.

In most cases, where these criteria require parameters the DSL supplies some meaningful defaults, thus hiding more complex details to the end users.

Once the query expression is complete, it gets **translated** into the standard Pythia query DSL, thus allowing users to have a glance at it if they want to learn it by example, or just customize some of its parameters.

For instance, users can just ask the system 'trova un anglicismo poco simile a "provider"' and get this Italian sentence automatically translated into a query like:

```txt
[language="eng"] AND [value%="provider:0.5"]
```

This query just looks for any word having both these properties:

- language = English;
- value similar to "provider" with a similarity threshold equal to 0.5 (in a range from 0 to 1, where 1 is equal).

The query will thus find any English word which is broadly similar to "provider". Should you just want to find any foreign word in these Italian texts, you could just replace "anglicismo" with "forestierismo", and get a slightly different query:

```txt
[language<>"ita"] AND [value%="provider:0.5"]
```

In this case, the DSL has built a query which finds any non-Italian word, as of course in this case we deal with an Italian corpus, where any non-Italian word is considered as foreign. On passage, legal acts are full of foreign words especially drawn from Latin, and this is thus a very useful feature in linguistic or juridic searches.

Speaking about Latin, this DSL also allows for searching not just a single word, but also a full phrase, as in most cases juridic texts use them in a highly formular way. This is made possible by the fact that the underlying Pythia engine deals with any span of text, representing any type of textual structure, whether it's a word, or a phrase, sentence, verse, etc. In this case, a query expression like 'trova la locuzione "pro tempore"' would thus be translated into `[$fp-lat] AND [_value="pro tempore"]`, where `$` is the prefix used for non-token spans ("structures") and `fp-lat` the name chosen during indexing for Latin foreign phrases (in this case, the `_` prefix before `value` tells the engine to refer this attribute to the mentioned structure, rather than to a token).

Any valid path along the expression tree can be exploited; so one might modify this expression like 'trova la locuzione iniziante per "pro"' to get `[$fp-lat] AND [_value^="pro"]`, or 'terminante per "tempore" to get `[$fp-lat] AND [_value$="pro"]`; in both cases, the only difference is the comparison operator.

Again, we could add more clauses about the relative position of the text being searched, like in 'trova la parola "invero" a inizio di frase"; this would be translated into:

```txt
[value="invero"] LALIGN(m=0) [$snt]
```

which means looking for a word whose value is equal to "invero", left-aligned with a sentence object, only when the maximum distance (`m`) from its start is 0. This will effectively find that word only when it appears at the beginning of a sentence.

Even these short sample expressions should be enough to show how they can be a powerful way for exploiting the potential of the underlying engine while preserving a very easy user experience. In fact, in Minerva this additional query layer just builds on top of the base one, as a higher-order DSL. In this case, we have a twofold translation:

1. the Italian query DSL is translated into the base query DSL.
2. the base query DSL is translated into SQL.

Alternatively, Minerva users can also use the base query DSL, either directly or from a translated expression (when they want to modify it); in both cases, we will end up with the same SQL code. Of course, a third-party software might either use these DSLs, or just bypass them and use its own, or even no DSL at all, when directly talking to the underlying database engine via SQL or some helper tool (e.g. an ORM mapping technology).

>⚙️ Technically, both DSLs are defined via ANTLR; in the case of the Pythia engine, ANTLR generates a C# parser integrated in its backend, while in the case of Minerva its additional DSL is limited to the frontend it applies to, so there ANTLR generates a Typescript parser directly leveraged in the UI.

Finally, an even more natural addition implemented in Minerva on top of this DSL is the consequence of using natural-language like expressions for it: in fact, as an alternative input method the UI leverages the browser's builtin **speech recognition** capabilities to let users just say what they want to find. In this case, the speech is converted into text, validated and integrated by the software (for instance to introduce quotes around the values being searched), and finally translated just as it had been entered by typing it. This provides an additional and very natural way for querying this index, especially fit to wider audiences.

## ANTLR

ANTLR requires JDK to generate the TS files from the G4 grammar file.

To **install JAVA**:

1. goto <https://www.oracle.com/java/technologies/downloads/>.
2. download your installer and run it.

Setting environment variables in Windows:

1. right-click on the "Start" button and select "System".
2. click on "Advanced system settings".
3. in the "Advanced" tab, click on "Environment Variables".
4. under "System variables", find the "Path" variable and click "Edit".
5. add the path to the "bin" directory of your Java installation. This is typically located in `C:\Program Files\Java\jdk-version\bin`. Click "OK" to save the changes.
6. Verify Installation from a PowerShell terminal with command `java -version`:

To **generate code from G4** grammar files in Ubuntu:

```bash
python3 -m venv pyantlr
cd pyantlr
source bin/activate
pip install antlr4-tools
antlr4 -Dlanguage=TypeScript pqita.g4
```

The [ANTLR runtime for TS](https://github.com/antlr/antlr4/blob/master/doc/typescript-target.md) is installed via `npm i antlr4`.

If you update the grammar, you should regenerate the TS files and then:

- for lexer: overwrite all the code and rename `pqitaLexer` in `PqitaLexer`.
- for parser: overwrite all the code and rename `pqitaParser` in `PqitaParser`.
- for listener: keep the existing code, patching it where required.

### Grammar

The ANTLR grammar used to convert fixed but composable Italian sentences based on components.

💡 To test the grammar with the online [ANTLR Lab](http://lab.antlr.org):

1. remove the default code you find in both Lexer and Parser.
2. in Parser, paste the whole content of the [grammar file](src/pqita.g4).
3. to the right, under Start rule, type `expression`.
4. enter some test query in `input` and click `Run`.

The grammar components in their order are  (the asterisk marks required components):

(1) VERB: "trova".

(*2):
   (2.1.) ITEM: "[la] parola" | "[la] locuzione" | "[il] lemma" | "[il] forestierismo" | "[l'] anglicismo" | "[il] latinismo".
     (2.1.1.) OPERATOR: "uguale a|iniziante per|terminante per|contenente|corrispondente a|(molto|poco) simile a" or just nothing.
     (2.1.2.) VALUE: any text between double quotes.
   (2.2.) SET: "tutte|tutti (le|i|gli)
parole|forestierismi|anglicismi|latinismi".

(3) POS: "come verbo|aggettivo|sostantivo" etc.

(4) STYLE: "in grassetto|corsivo|sottolineato".

(5.1.) LOC: ["non"] + "a inizio di frase|fine di frase".
(5.2):
   (5.2.1.) REL: ["non"] + "vicino a|(attaccato|attaccata|attaccati) a|prima (di|della|del)|dopo (di|della|del)"
   (5.2.2.) another sequence from 2 to 5, recursively.

![grammar](./public/img/pqita.png)

So for instance we can have:

- `trova la parola uguale a "esempio"` which is:

1. trova
  2.1. la parola
    2.1.1. uguale a
    2.1.2. "esempio"

- `tutti i latinismi` which is:

2.2 tutti i latinismi

- `trova la parola "cane" come sostantivo in grassetto prima della parola "bello"`, which is:

1. trova
  2.1.1. la parola
  2.1.2. "cane"
3. come sostantivo
4. in grassetto
  5.2.1. prima della
  2.1. parola
    2.1.1. nothing
    2.1.2. "bello"

The corresponding parser directions are to build pairs joined by `AND`, handling recursion at branch 5.2, as follows:

- on item: according to operator:
  - "uguale a": output `[value="<VALUE>"]`;
  - "iniziante per": output `[value^="<VALUE>"]`;
  - "terminante per": output `[value$="<VALUE>"]`;
  - "contenente": output `[value*="<VALUE>"]`;
  - "corrispondente a": output `[value?="<VALUE>"]`;
  - "simile a": output `[value%="<VALUE>:<THRESHOLD>"]` where THRESHOLD is 0.5 for "poco simile a", 0.8 for "simile a", 0.9 for "molto simile a";

- on set: according to set:
  - "parole": nothing. This assumes that there will be other nodes after this (for branches 3 or 4), or we should emit an error.
  - "forestierismi": output `[language<>"ita"]`;
  - "anglicismi": output `[language="eng"]`;
  - "latinismi": output `[language="lat"]`;

- on pos: output `[pos="<POS>"]`;

- on style: according to style:
  - "in grassetto": output `[b="1"]`;
  - "in corsivo": output `[i="1"]`;
  - "in sottolineato": output `[u="1"]`;

- on loc: this provides a join between the previously output pair and the next one. According to loc:
  - "a inizio di frase":
    - if "non": output space + `LALIGN(n=1) [$name="snt"]` after a left pair. There should be one, or there is an error;
    - else: output space + `LALIGN(m=0) [$name="snt"]` after a left pair. There should be one, or there is an error;
  - "a fine di frase":
    - if "non": output space + `RALIGN(n=1) [$name="snt"]` after a left pair. There should be one, or there is an error;
    - else: output space + `RALIGN(m=0) [$name="snt"]` after a left pair. There should be one, or there is an error.

- on rel:
  - if "non", output space + `NOT`;
  - according to rel:
    - "vicino a": output space + `NEAR(m=3,s=snt)` + space;
    - "(attaccato|attaccata|attaccati) a": output space + `NEAR(m=0,s=snt)` + space;
    - "prima di|della|del": output space + `BEFORE(m=3,s=snt)` + space;
    - "dopo di|della|del": output space + `AFTER(m=3,s=snt)` + space.

## History

### 3.0.1

- 2026-01-19: updated Angular and packages.
- 2026-01-09: updated Angular and packages.
- 2025-11-24:
  - ⚠️ upgraded to Angular 21.
  - migrated to `pnpm`.
- 2025-11-16: updated Angular and packages.

### 3.0.0

- 2025-11-13: updated Angular and packages.
- 2025-09-29: updated Angular and packages.
- 2025-09-18:
  - updated Angular and packages.
  - ⚠️ refactored for full reactivity.
- 2025-09-08: updated Angular and packages.

### 2.0.1

- 2025-07-29: updated packages (with export fix).
- 2025-06-22:
  - added preset queries.
  - updated Angular and packages.
- 2025-06-15: refactored query from index so that instead of searching the span's value (e.g. `[value="abbandonato"]`) it searches for the lemma or word ID (`[lemma_id="123"]`). This reconciliates the counts in the words index with those in the search result. Before this, searching for "abbandonato" from lemma "abbandonare" also included forms of "abbandonato" which were classified as adjective rather than verb (past participle).

### 2.0.0

- 2025-06-04: ⚠️ upgraded to Angular 20.

### 1.1.0

- 2025-02-07:
  - updated Angular and packages (added feature: POS filtering).
  - added missing translations to search component.
  - better homepage style.

### 1.0.1

- 2025-01-29:
  - updated Angular and packages.
  - added view transitions.
- 2025-01-22:
  - updated Angular.
  - replaced deprecated `baseHref` with `subPath` in `angular.json`. Setting this to `""` means that the localized version will be output as the root app in the `dist/browser` folder. If we omit this, it will be output under its locale subfolder. The Dockerfile has changed accordingly.
- 2025-10-20: updated Angular.
- 2025-01-09: updated Angular and packages. 👉 Preserved direct import of `@angular/localize/init` in `app.config` to avoid runtime errors, which should not be there.
- 2024-12-29: updated packages.

### 1.0.0

- 2024-12-20:
  - ⚠️ updated Pythia dependencies to 6.
  - removed `envServiceProvider`.
  - updated Angular and packages.
- 2024-11-22: ⚠️ Upgraded to Angular 19.
- 2024-11-16: fix to "non" parsing to emit "NOT".
- 2024-11-14: fix to "non" parsing for "inizio di frase" and the like: must check for both null and undefined. This way, `parola "cane" a inizio di frase` becomes `[value="cane"] LALIGN(m=0) [$name="snt"]` while `parola "cane" non a inizio di frase` becomes `[value="cane"] LALIGN(n=1) [$name="snt"]`.

### 0.0.5

- 2024-11-07:
  - search lemma rather than word when clicking on lemma in words index.
  - better "no results" message.
  - updated Angular.
- 2024-11-06:
  - added diacritic stripping in simple query.
  - hide preset group when single.

### 0.0.4

- 2024-11-05: updated packages (fix in search clear).
- 2024-10-31:
  - updated about and Italian translations.
  - updated Angular.
  - reexported pqita.png with correct colors.
- 2024-10-30:
  - more tests.
  - added preset queries.
- 2024-10-28:
  - fix to set AND for type "tutti i latinismi in corsivo".
  - added query presets.

### 0.0.3

- 2024-10-25:
  - added many more values to "come".
  - added more tests.
  - readonly converted query in simple search.
- 2024-10-24:
  - hide query builder.
  - added single word query as a corner case in pqita service. Now if you enter a query having no inner spaces, it is assumed to be a single word search, whether the word is between `""` or not.
  - updated packages to allow hiding some controls from the word index filter and provide custom sort order entries.
- 2024-10-23: updated packages and messages.
- 2024-10-22:
  - changed some tokens in g4 (dopo without "di").
  - added tests.
  - updated Italian translations.
  - updated about page.
- 2024-10-19: hide language in word index.
- 2024-10-18:
  - added word and lemmata stats.
  - updated Angular.
  - added rate limit interceptor.

### 0.0.2

- 2024-10-18: replaced speech recognition engine to allow cross-browsers compatibility and fallback in case of no available engine (as it happens on Firefox).

### 0.0.1

- 2024-10-17: created image.
