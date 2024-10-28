(function (window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = "http://localhost:5180/api/";
  window.__env.version = "0.0.3";
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
    { group: "linguista", value: 'trova la parola "accertamento"' },
    { group: "linguista", value: "trova tutti i latinismi" },
    { group: "giurista", value: "trova tutti i latinismi" },
  ];
})(this);
