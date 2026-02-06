import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';

import { AuthJwtService, User } from '@myrmidon/auth-jwt-login';

import { PqitaService } from '../services/pqita.service';

@Component({
  imports: [RouterModule, MatCardModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public user$: Observable<User | null>;

  constructor(authService: AuthJwtService, pqitaService: PqitaService) {
    this.user$ = authService.currentUser$;
  }
}
