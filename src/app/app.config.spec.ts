import { HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { QUERY_BUILDER_ATTR_DEFS_KEY } from '@myrmidon/pythia-query-builder';

import { appConfig } from './app.config';
import { ATTR_DEFS } from './attr-defs';
import { I18nPaginatorIntlService } from './services/i18n-paginator-intl.service';
import { SPEECH_RECOGNITION_LANG } from './services/speech-recognition.service';

describe('appConfig', () => {
  let snackBar: { open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    snackBar = { open: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        ...appConfig.providers,
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });
  });

  it('should run the rate limit interceptor on HTTP requests', () => {
    const error = vi.fn<(error: unknown) => void>();
    TestBed.inject(HttpClient).get('/api/test').subscribe({ error });

    TestBed.inject(HttpTestingController)
      .expectOne('/api/test')
      .flush(null, { status: 429, statusText: 'Too Many Requests' });

    expect(snackBar.open).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(1);
  });

  it('should use the localizable paginator labels', () => {
    expect(TestBed.inject(MatPaginatorIntl)).toBeInstanceOf(
      I18nPaginatorIntlService,
    );
  });

  it('should set Italian as the speech recognition language', () => {
    expect(TestBed.inject(SPEECH_RECOGNITION_LANG)).toBe('it-IT');
  });

  it('should provide the attribute definitions to the query builder', () => {
    expect(TestBed.inject(QUERY_BUILDER_ATTR_DEFS_KEY as never)).toBe(
      ATTR_DEFS,
    );
  });
});
