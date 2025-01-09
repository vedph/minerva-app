import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import '@angular/localize/init';

// material
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// vendor
import { NgxEchartsModule } from 'ngx-echarts';

// myrmidon
import { QUERY_BUILDER_ATTR_DEFS_KEY } from '@myrmidon/pythia-query-builder';

// local
import { I18nPaginatorIntlService } from './services/i18n-paginator-intl.service';
import { SPEECH_RECOGNITION_LANG } from './services/speech-recognition.service';
import { routes } from './app.routes';
import { ATTR_DEFS } from './attr-defs';
import { RateLimitInterceptor } from './interceptors/rate-limit.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withDebugTracing()),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
    ),
    // HTTP interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RateLimitInterceptor,
      multi: true,
    },
    {
      provide: QUERY_BUILDER_ATTR_DEFS_KEY,
      useValue: ATTR_DEFS,
    },
    {
      provide: SPEECH_RECOGNITION_LANG,
      useValue: 'it-IT',
    },
    // paginator i18n
    {
      provide: MatPaginatorIntl,
      useClass: I18nPaginatorIntlService,
    },
  ],
};
