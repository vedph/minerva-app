# History

## 6.0.0

- 2026-10-22: ⚠️ refactored `pqita.g4` grammar and query frontend.
- 2026-10-21: updated manual.

## 5.0.1

- 2026-10-19:
  - migrated to M3 styles adding dark/light themes.
  - responsive layout revision (requires the Pythia libraries layout revision of the same date: `pythia-word-index` 11.0.2, `pythia-document-reader` 11.0.4, `pythia-search` 11.0.4, `pythia-query-builder` 11.0.2):
    - search: the export and clear buttons are right-aligned below the results; before, being outside the layout grid areas, they ended up below the document reader. The layout depends on the width available to the component (CSS container queries), and the results table scrolls horizontally inside its own wrapper rather than widening the page. Removed the negative margin of the advanced search button, which overlapped the query hint. The headers of the number and actions columns were empty and swapped with respect to their cells: they now have labels read only by assistive technologies.
    - statistics: removed the fixed widths (600px pie, 1000px tags cloud), which overflowed windows narrower than about 1450px: the pie and the tags cloud share the width when there is room (from 1280px), else they are stacked, and the cloud fits its container. The pie legend is a row below it, so that it never overlaps it.
    - added the CDK visually hidden styles (`cdk.a11y-visually-hidden`).

## 5.0.0

- 2026-10-16:
  - updated packages.
  - rate limit (429): users are told to wait (for the seconds requested by the server's `Retry-After` header, if any) and try again, in Italian and for 10 seconds rather than 3. Before, as the API always asks to wait until the end of its rate limit window (usually 1 minute), each rejected request was silently retried up to 3 times, so that the app looked frozen for minutes before showing a short English message. Now requests are retried only when the server asks to wait for at most 5 seconds; the message is shown once for concurrent rejections, and after any message opened by the consumer of the failed request (which would otherwise replace it); consumers get the original `HttpErrorResponse` rather than a generic `Error`.
  - ⚠️ localization: `pnpm run xi18n` failed, as `xliffmerge` (`ngx-i18nsupport`, no longer maintained) is not compatible with current Node versions, so that new messages were never merged into `messages.it.xlf`. Replaced it with the `ng-extract-i18n-merge` builder for `ng extract-i18n` (configured in `angular.json`; removed `xliffmerge.json`), and translated the missing messages: the 6 reported by the build as untranslated ("less-than or equal", "Reset filters", "Apply filters", "Clear filter", "Search failed", and a paged tree node toggle), 8 more from the Pythia libraries, and the new rate limit messages. Updated the README localization and build instructions.
  - removed the `pnpm` field from `package.json` (a `rollup` override), which pnpm no longer reads (so it had no effect) and prevented running scripts after installing packages.
  - added the `hideMap` setting in `env.js` to provide two versions of the app from the same code base: a public one (`hideMap` `"true"`, the default also when missing), where users can read only the context of search results (the document map is neither shown nor loaded, and the read document button is hidden); and a teammates one (`hideMap` `"false"`, see `env.team.js`) where users can browse whole documents. `ItaSearchComponent` got a corresponding `hideMap` input. See README for deployment: `docker-compose.yml` now runs both versions, each with its own API.
- 2026-10-10: ⚠️ migrated to signal-based forms.

## 4.0.1

- 2026-10-10:
  - fixed the `Angular compilation initialization failed` build error (`The requested module '@jridgewell/sourcemap-codec' does not provide an export named 'encodeRangeMappings'`): `@angular/compiler-cli` 22.2 requires `@jridgewell/sourcemap-codec` 1.6.0+ while still declaring `^1.4.14`, so the lockfile kept 1.5.5. Added an override for `^1.6.0` in `pnpm-workspace.yaml`.
  - ⚠️ migrated tests from Jest to Vitest via the `@angular/build:unit-test` builder (`pnpm test`, `pnpm test:ci`, `pnpm test:coverage`). Removed `@angular-builders/jest`, `jest`, `jest-preset-angular`, `@types/jest`, `@types/jasmine`, `jasmine-core`, `karma-coverage`, `jest.config.js`, `setupJest.ts` and the stale Jest/Karma launch configurations. Added `vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/angular`, `@testing-library/user-event`, `@testing-library/dom`, `@testing-library/jest-dom`.
  - added tests for all the components (Angular Testing Library), services and the interceptor.
  - fixes found while testing:
    - the rate limit interceptor was never used, because `provideHttpClient` lacked `withInterceptorsFromDi()`. Now that it runs: on 429 it shows its notification; it retries (up to 3 times) only when the server sends a `Retry-After` header (seconds or HTTP date), rather than blindly after 1 second; and it no longer replaces any other HTTP error with a generic `Error`, so that consumers still get the original `HttpErrorResponse` and its status.
    - the "text too long" (simple query) and "query too long" (advanced query) messages were never displayed, because templates looked for the `maxLength` error key instead of `maxlength`.
    - in the simple query, Ctrl+T or Ctrl+Enter in the query box requested a search for an empty query when the text had not been converted yet.
    - in the simple query, preset entries without a `group` were never listed.
    - in the simple query, text typed within the first 100 ms was overwritten by the initial empty speech recognition text.
    - accessibility: added names (`aria-label`) to icon-only buttons, autorun toggle and preset selectors in simple and advanced query. All reuse existing translations, except for the new `convert` message (added to `messages.xlf` and `messages.it.xlf`).
    - fixed a stale test expectation (`[$snt]` instead of `[$name="snt"]`).
    - speech recognition service made more robust: it now follows the engine when this stops by itself (error, denied permission, silence) rather than staying in listening state; it keeps the text recognized before a pause rather than only the last recognized part; it ignores requests to start when already listening or to stop when not listening; it survives engine failures on start/stop; it releases the microphone and its timer when the component is destroyed; it no longer logs to the console every 250 ms. `SPEECH_RECOGNITION_LANG` is now an `InjectionToken` defaulting to `it-IT`.
    - removed router debug tracing (`withDebugTracing`).
    - replaced `@HostListener` with the `host` property in `PqitaComponent`.
- 2026-09-01: updated packages.
- 2026-08-27: updated packages.

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
