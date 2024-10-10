import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { PythiaSearchModule } from '@myrmidon/pythia-search';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, PythiaSearchModule],
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
