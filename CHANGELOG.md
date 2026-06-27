# History

## 4.0.0

- 2026-06-27:
  - updated Angular and packages.
  - refactored Docker scripts.
- 2026-05-27: updated Angular and packages.
- 2026-02-24: updated Angular and packages.
- 2026-02-06:
  - updated Angular and packages.
  - migrated to OnPush.
  - ⚠️ migrated to zoneless.
- 2026-02-04: updated Angular and packages.

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
