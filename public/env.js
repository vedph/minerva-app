(function (window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = "http://localhost:5180/api/";
  window.__env.version = "2.0.0";
  window.__env.hasLemmata = "true";
  window.__env.indexDocAttrs = [
    { name: "data", type: 0 },
    { name: "giudicante", type: 0 },
    { name: "grado", type: 0 },
    { name: "materia", type: 0 },
    { name: "nascita-avv", type: 0 },
    { name: "sede-giudicante", type: 0 },
    { name: "sesso-avv", type: 0 },
  ];
  window.__env.pqitaPresetEntries = [
    { group: "-", value: 'trova la parola "apodittica"' },
    { group: "-", value: 'trova il lemma "appalesare"' },
    { group: "-", value: 'trova la parola iniziante per "dis"' },
    { group: "-", value: 'trova la parola contenente "corr"' },
    { group: "-", value: 'trova la locuzione "pro tempore"' },
    { group: "-", value: 'trova la parola terminante per "ante"' },
    {
      group: "-",
      value: 'trova la parola terminante per "ante" come participio',
    },
    { group: "-", value: 'trova la parola poco simile a "periculum"' },
    { group: "-", value: "trova tutti i forestierismi" },
    { group: "-", value: "trova tutte le parole come infinito" },
    { group: "-", value: 'trova la parola "che" come pronome' },
    { group: "-", value: "trova tutti i latinismi in corsivo" },
    { group: "-", value: 'trova il lemma "visto" in grassetto' },
    { group: "-", value: 'trova la parola "ciò" vicino alla parola "detto"' },
    { group: "-", value: 'trova la parola "preso" prima della parola "atto"' },
    { group: "-", value: 'trova la parola "nonostante" dopo la parola "ciò"' },
    {
      group: "-",
      value:
        'trova il lemma "ritenere" prima di tutte le parole come participio',
    },
    { group: "-", value: 'trova il lemma "bastare" a inizio di frase' },
    {
      group: "-",
      value: 'cerca il lemma "domanda" prima della parola "attoreo"',
    },

    { group: "-", value: 'cerca il lemma "nonostante" dopo la parola "cio"' },
  ];
})(this);
