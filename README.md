# Minerva

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Localization

1. `ng add @angular/localize`.
2. in `app.config.ts`, add `import '@angular/localize/init';`. Among other stuff, this will import `$localize`. Do not import `$localize` directly because it can be imported only once.
3. extract XLIF: `ng extract-i18n --output-path=src/i18n`.
4. create copies of XLIF with translations: When creating a new translation, you can use an editor like PoEdit for editing the localized copy of this XLIF file. Then you will rather synchronize the files. To synch translations once you rebuild XLIF, use some translation-memory enabled tool like OmegaT.
5. in `angular.json`, under your `projects/YOURPROJECT` add an `i18n` section where you configure all the supported locales, e.g.:

    ```json
    "i18n": {
      "sourceLocale": "en-US",
      "locales": {
        "it": {
          "baseHref": "",
          "translation": "src/i18n/messages.it.xlf"
        }
      }
    },
    ```

6. in `angular.json`, under `projects/YOURPROJECT/architect/build/options` add a localize property with the languages you want to build, e.g. `"localize": ["it"]`.

## Static Pages

Source document: <https://docs.google.com/document/d/12yXGM6TPunSVkkMUiW7ejtkqc0GaAPr8OJZAKnUGLZg/edit?usp=sharing>

