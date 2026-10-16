import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { EnvService } from '@myrmidon/ngx-tools';

import { ItaSearchComponent } from '../components/ita-search/ita-search.component';

/**
 * Whether the document map must be hidden according to the hideMap value of
 * env.js. The map is hidden unless this value is explicitly false, so that
 * a missing setting never lets users browse whole documents.
 *
 * @param value The env.js value.
 * @returns True to hide the map.
 */
export function isMapHidden(value: unknown): boolean {
  return !(value === false || String(value).toLowerCase() === 'false');
}

@Component({
  imports: [MatCardModule, MatIconModule, ItaSearchComponent],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public readonly initialQueryTerm = signal<string | undefined>(undefined);

  /**
   * Whether to hide the document map, from env.js hideMap.
   */
  public readonly hideMap = signal<boolean>(
    isMapHidden(inject(EnvService).get('hideMap')),
  );

  constructor(route: ActivatedRoute) {
    if ('term' in route.snapshot.params) {
      this.initialQueryTerm.set(route.snapshot.params['term']);
    }
  }
}
