import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ItaSearchComponent } from '../components/ita-search/ita-search.component';

@Component({
    imports: [CommonModule, MatCardModule, MatIconModule, ItaSearchComponent],
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public initialQueryTerm: string | undefined;

  constructor(route: ActivatedRoute) {
    if ('term' in route.snapshot.params) {
      this.initialQueryTerm = route.snapshot.params['term'];
    }
  }
}
