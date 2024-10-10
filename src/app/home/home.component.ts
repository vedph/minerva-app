import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';

import { AuthJwtService, User } from '@myrmidon/auth-jwt-login';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public user$: Observable<User | null>;

  constructor(authService: AuthJwtService) {
    this.user$ = authService.currentUser$;
  }
}
