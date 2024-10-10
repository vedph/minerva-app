import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// material
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import '@angular/localize/init';

// vendor
import { NgxEchartsModule } from 'ngx-echarts';

// myrmidon
import { EnvServiceProvider } from '@myrmidon/ng-tools';
import { QUERY_BUILDER_ATTR_DEFS_KEY } from '@myrmidon/pythia-query-builder';

// local
import { I18nPaginatorIntlService } from './services/i18n-paginator-intl.service';
import { routes } from './app.routes';
import { ATTR_DEFS } from './attr-defs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withDebugTracing()),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
    ),
    EnvServiceProvider,
    // query builder
    {
      provide: QUERY_BUILDER_ATTR_DEFS_KEY,
      useValue: ATTR_DEFS,
    },
    // paginator i18n
    {
      provide: MatPaginatorIntl,
      useClass: I18nPaginatorIntlService,
    },
  ],
};
