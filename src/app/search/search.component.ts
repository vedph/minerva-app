import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

import { ItaSearchComponent } from '../components/ita-search/ita-search.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, ItaSearchComponent],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  public initialQueryTerm: string | undefined;

  constructor(route: ActivatedRoute) {
    if ('term' in route.snapshot.params) {
      this.initialQueryTerm = route.snapshot.params['term'];
    }
  }
}
