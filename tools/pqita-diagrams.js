// Generate the syntax diagrams of the pqita language (src/pqita.g4)
// used in the user manual. Usage (railroad-diagrams is not a dependency
// of the app, so install it in any folder and run from there):
//   npm i railroad-diagrams@1.0.0
//   node <app>/tools/pqita-diagrams.js <app>/public/img
// Keep these diagrams in sync with the grammar when changing it.

const fs = require('fs');
const path = require('path');
const rr = require(
  require.resolve('railroad-diagrams', { paths: [process.cwd()] }),
);

const { Diagram, Sequence, Choice, Optional, OneOrMore, Terminal } = rr;
const N = rr.NonTerminal;

// the category of each box, used to color it
const CATEGORIES = {
  verb: ['trova', 'cerca'],
  object: [
    'parola',
    'lemma',
    'locuzione',
    'forestierismo',
    'anglicismo',
    'latinismo',
    'oggetto',
    'le parole',
    'le locuzioni',
    'i forestierismi',
    'gli anglicismi',
    'i latinismi',
  ],
  article: ['il, la, l’, un, una…', 'tutte, tutti'],
  operator: [
    'uguale a',
    'iniziante per',
    'terminante per',
    'contenente',
    'corrispondente a',
    'simile a',
    'molto',
    'poco',
  ],
  value: ['"…"', 'testo'],
  feature: ['come', 'categoria grammaticale', 'caratteristiche'],
  style: ['in grassetto', 'in corsivo', 'in sottolineato'],
  position: [
    'non',
    'a inizio di frase',
    'a fine di frase',
    'vicino a',
    'attaccato a',
    'prima di',
    'dopo',
  ],
};

const STYLE = `<style>
svg.railroad-diagram { background-color: white; }
svg.railroad-diagram path { stroke-width: 2; stroke: #333; fill: none; }
svg.railroad-diagram text { font: bold 14px monospace; text-anchor: middle; fill: black; }
svg.railroad-diagram rect { stroke-width: 2; stroke: #333; fill: #eee; }
svg.railroad-diagram rect.verb { fill: #f2f2f2; stroke-dasharray: 4 2; }
svg.railroad-diagram rect.object { fill: #c9ecb4; }
svg.railroad-diagram rect.article { fill: #e6f4dc; }
svg.railroad-diagram rect.operator { fill: #bfe3f8; }
svg.railroad-diagram rect.value { fill: #f8c4c4; }
svg.railroad-diagram rect.feature { fill: #fbdca0; }
svg.railroad-diagram rect.style { fill: #e2d3ec; }
svg.railroad-diagram rect.position { fill: #d8cdfb; }
</style>`;

function colorize(svg) {
  const categoryOf = (text) =>
    Object.keys(CATEGORIES).find((c) =>
      CATEGORIES[c].includes(text.replace(/&quot;/g, '"')),
    );
  // each box is a rect followed by its text
  return svg
    .replace(
      /<rect ([^>]*)><\/rect>\s*<text ([^>]*)>([^<]*)<\/text>/g,
      (m, rect, text, label) => {
        const category = categoryOf(label);
        return category
          ? `<rect class="${category}" ${rect}></rect>\n<text ${text}>${label}</text>`
          : m;
      },
    )
    .replace(
      '<svg class="railroad-diagram"',
      '<svg xmlns="http://www.w3.org/2000/svg" class="railroad-diagram"',
    )
    .replace(/(<svg[^>]*>)/, `$1\n${STYLE}`);
}

const styles = () => Choice(0, 'in grassetto', 'in corsivo', 'in sottolineato');
const location = () =>
  Sequence(
    Optional('non', 'skip'),
    Choice(0, 'a inizio di frase', 'a fine di frase'),
  );

const diagrams = {
  // the whole sentence: an object with its optional location, optionally
  // followed by relations with other objects, each with its own location
  // (the relation is drawn on the path returning to the object)
  'pqita-frase': Diagram(
    Optional(Choice(0, 'trova', 'cerca')),
    OneOrMore(
      Sequence(N('oggetto'), Optional(location(), 'skip')),
      Sequence(
        Optional('non', 'skip'),
        Choice(0, 'vicino a', 'attaccato a', 'prima di', 'dopo'),
      ),
    ),
  ),
  // the object to find
  'pqita-oggetto': Diagram(
    Choice(
      0,
      Sequence(
        Optional(Terminal('il, la, l’, un, una…'), 'skip'),
        Choice(
          0,
          Sequence(
            'parola',
            Choice(
              0,
              Sequence(N('testo'), Optional(N('caratteristiche'), 'skip')),
              N('caratteristiche'),
            ),
          ),
          Sequence('lemma', N('testo'), Optional(N('caratteristiche'), 'skip')),
          Sequence(
            Choice(0, 'forestierismo', 'anglicismo', 'latinismo'),
            Optional(N('testo'), 'skip'),
            Optional(N('caratteristiche'), 'skip'),
          ),
          Sequence('locuzione', Optional(N('testo'), 'skip')),
        ),
      ),
      Sequence(
        Optional(Terminal('tutte, tutti'), 'skip'),
        Choice(
          0,
          Sequence('le parole', N('caratteristiche')),
          Sequence(
            Choice(0, 'i forestierismi', 'gli anglicismi', 'i latinismi'),
            Optional(N('caratteristiche'), 'skip'),
          ),
          'le locuzioni',
        ),
      ),
    ),
  ),
  // the text to find, with its comparison
  'pqita-testo': Diagram(
    Optional(
      Choice(
        0,
        'uguale a',
        'iniziante per',
        'terminante per',
        'contenente',
        'corrispondente a',
        Sequence(Optional(Choice(0, 'molto', 'poco'), 'skip'), 'simile a'),
      ),
      'skip',
    ),
    Terminal('"…"'),
  ),
  // grammatical and typographic features
  'pqita-caratteristiche': Diagram(
    Choice(
      0,
      Sequence(
        'come',
        OneOrMore(N('categoria grammaticale')),
        Optional(styles(), 'skip'),
      ),
      styles(),
    ),
  ),
};

const outDir = process.argv[2] || '.';
for (const [name, diagram] of Object.entries(diagrams)) {
  const file = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(file, colorize(diagram.toString()) + '\n');
  console.log(file);
}
