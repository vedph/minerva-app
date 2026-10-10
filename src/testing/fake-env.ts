import { Provider } from '@angular/core';

import { EnvService } from '@myrmidon/ngx-tools';

/**
 * Provide an EnvService replacement backed by the specified values, so that
 * tests do not depend on the content of the global `window.__env` object.
 */
export function provideFakeEnv(values: Record<string, unknown> = {}): Provider {
  return {
    provide: EnvService,
    useValue: {
      get: (key: string, defValue?: string) => values[key] ?? defValue,
    },
  };
}
