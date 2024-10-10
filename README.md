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

To update messages: `npm run xi18n` and use Poedit to edit `messages.it.xlf`.

## Static Pages

Source document: <https://docs.google.com/document/d/12yXGM6TPunSVkkMUiW7ejtkqc0GaAPr8OJZAKnUGLZg/edit?usp=sharing>

## ANTLR

ANTLR requires JDK to generate the TS files from the G4 grammar file. For instance in Ubuntu:

```bash
python3 -m venv pyantlr
cd pyantlr
source bin/activate
pip install antlr4-tools
antlr4 -Dlanguage=TypeScript pqita.g4
```

The [ANTLR runtime for TS](https://github.com/antlr/antlr4/blob/master/doc/typescript-target.md) is installed via `npm i antlr4`.

To install JAVA:

1. goto <https://www.oracle.com/java/technologies/downloads/>.
2. download your installer and run it.

Setting environment variables in Windows:

1. right-click on the "Start" button and select "System".
2. click on "Advanced system settings".
3. in the "Advanced" tab, click on "Environment Variables".
4. under "System variables", find the "Path" variable and click "Edit".
5. add the path to the "bin" directory of your Java installation. This is typically located in `C:\Program Files\Java\jdk-version\bin`. Click "OK" to save the changes.
6. Verify Installation from a PowerShell terminal with command `java -version`:
