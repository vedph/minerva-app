# Reactive → signal forms migration log

Only verified facts are recorded here. Anything not measured is marked
**believed**, with how to check it.

## Environment (verified 2026-10-10)

- `@angular/forms` 22.2.2 installed; all `@myrmidon/pythia-*` at 11.0.0.
- Baseline before any change, on the v11 packages: `ng test --no-watch`
  14 files / 404 tests green.
- Forms inventory (grep for `@angular/forms`, `formControl`, `formGroup`,
  `ngModel`, `valueChanges` in `src/`): only `pqita` and `ita-search` hold
  forms; `words` and `stats` only imported an unused `ReactiveFormsModule`.
  No `NgxToolsValidators`, no `FormArray`, no `model()` component.

## Why there is no `linkedSignal` / echo test here

Neither form derives from a bound model: no component in this app has a
`model()` or an input that feeds a form continuously, and none autosaves.
Both forms are local state, so each is a plain `form(signal({...}), schema)`,
as in the v11 `pythia-search` component. The template's echo/autosave specs
have no subject here and were not copied.

## pqita — done

- `form(signal<PqitaControls>)` over `presetGroup`, `presetEntry`, `text`,
  `autoRun`, `query`; `required` + `maxLength(1000)` on `text`.
- `history` was a `FormControl` bound to nothing and used as a state holder:
  now a plain `signal<HistoryEntry[]>`, updated by spread/filter.
- `filteredPresetEntries` was a writable signal filled by a debounced
  `presetGroup.valueChanges` subscription plus `ngOnInit`: now a `computed`
  of the group field. The initial group goes straight into the initial model,
  so `ngOnInit` is gone.
- "Changing group forgets the picked preset" is a `(selectionChange)` handler
  on the group select (fires on user changes only; the entry is always null
  on the programmatic initial set).
- `[readonly]="readonlyQuery()"` → `readonly(path.query, { when })` rule.
  Verified in jsdom and Chrome: the textarea has the `readonly` attribute, and
  converting/searching still works with it (new test; Chrome `/search`).
- `markAsDirty()` kept after programmatic text/query sets, as before.
- `<form>` → `<div>`; all buttons were already `type="button"`.
- Constructor injection → `inject()` (the constructor lost `FormBuilder`
  anyway; project guidelines require `inject()`).

## ita-search — done

- `form(signal({ query: '', history: null }))`, `required` +
  `maxLength(1000)` on `query`, same shape as v11 `pythia-search`.
- `<form (submit)="search()">` + `type="submit"` → no `<form>`,
  `type="button" (click)="search()"`. The form only held a `<textarea>` and a
  `mat-select`, so there was no implicit Enter submission to preserve;
  Ctrl+Enter is the existing explicit handler. Pinned by a test (plain Enter
  does not search) and measured in Chrome.
- Constructor injection → `inject()`, observables assigned as field
  initializers.

## words, stats

Unused `ReactiveFormsModule` import removed. Nothing else touched.

## Deliberate behaviour changes

1. **Typing/pasting past 1000 chars is now capped** in the pqita text and the
   advanced query. Measured: `[formField]` renders native `maxlength="1000"`
   (and `required`) on the textareas, in jsdom and Chrome. Before, the text was
   accepted and "too long" shown. The error is still reachable for values set
   by code (preset, speech, history, initial term) and is tested that way. Same
   change as in the v11 libraries.
2. pqita: picking a preset group filters the presets immediately; the 300 ms
   debounce is gone with the subscription.
3. pqita: `text`/`query` are `''` rather than `null` when empty (after Clear
   too). No consumer distinguishes them: all reads were truthiness/length
   checks.

## Verification

- `ng test --no-watch`: 14 files / 410 tests green (was 404). 3 existing
  too-long tests rewritten for change 1; added: cap on paste (both), no
  `<form>` (both), readonly query still converts/searches, plain Enter does
  not search.
- `ng build`: clean. 6 "No translation found" warnings, see out of scope.
- Chrome (headless, CDP, `ng serve` on :4200 after clearing `.angular/cache`,
  API on :5180):
  - `/search`, nested flow page → ita-search → pqita: 0 `<form>`; clear and
    convert disabled when empty; preset pick → text + `[lemma="appalesare"]`,
    no history row; Ctrl+Enter converts without history; convert button adds
    the history row; emptied text + blur → "text required"; history pick
    restores text and query and clears the error; Search →
    `GET …/api/search?query=[value="contratto"]…`, 20 rows, total 1891, panel
    collapsed; advanced tab holds `[value="contratto"]`, button is
    `type="button"`; plain Enter sent no request; Ctrl+Enter on
    `  [value="atto"]  ` sent the trimmed query; emptied query + blur → "query
    required", Search disabled.
  - `/search/contratto`: searched by itself (20 rows); history select → pick
    replaced the edited query and focused the textarea; "Read in context"
    loaded the document reader (3 document requests).
  - `/index`: word index rendered, `GET …/api/lemmata…`. `/stats`: table,
    chart and tag cloud rendered.
- Not exercised in Chrome: speech recognition (covered by the existing specs
  with the fake recognizer only) and the preset *group* select (the app's
  `env.js` has a single group, so it is not rendered; covered by specs).

## Verified along the way

- The API's CORS policy only allows origin `http://localhost:4200`: served on
  :4210, every API call failed with status 0; `curl -H "Origin: …:4210"`
  returned no `Access-Control-Allow-Origin`, `:4200` did.

## Out of scope — reported, not changed

1. `ita-search` results use `track r` (identity): Chrome logs `NG0956` on
   every search. v11 `SearchRepository` now provides a per-row `key`
   (`track r.key` in `pythia-search`); adopting it also needs the spec's fake
   repository to supply keys.
2. `pqita.component.html`: the "query required" / "query too long"
   `mat-error`s can never show, since `query` has no validators there (it had
   none before either). Translated as they were.
3. pqita's Search button is enabled with an empty text and a non-empty query,
   but `search()` then does nothing because the form is invalid. Unchanged
   behaviour (measured in Chrome).
4. `console.log` calls in app code: `stats.component.ts` (logs the API URL),
   `pqita.component.ts` (`convert` catch). In library code at runtime:
   `[PagedTreeStore] …` debug logs and `EnvService initializing`.
5. `ng build` warns "No translation found" for 6 messages ("Reset filters",
   "Apply filters", "Clear filter", "Search failed", "less-than or equal", a
   chevron block). None of these strings occurs in `src/` (grep), so they come
   from library templates. **Believed** new with v11; check by building the
   previous commit.
6. `stats`, `words`, `search` still use constructor injection.
7. `ItaSearchComponent.pageChange`, `onQueryPeek`, `onQueryChange` are not
   referenced by the template (the builder tab is commented out).
8. Prettier with the default `endOfLine` flags nearly every file in `src/`
   (CRLF working copies); there is no `.prettierrc`.
