import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';

import { HomeComponent } from './home.component';

@Component({ template: 'about page' })
class AboutStubComponent {}

async function setup() {
  const view = await render(HomeComponent, {
    routes: [{ path: 'about', component: AboutStubComponent }],
    providers: [
      { provide: AuthJwtService, useValue: { currentUser$: of(null) } },
    ],
  });
  return { ...view, user: userEvent.setup() };
}

describe('HomeComponent', () => {
  it('should show the project banner', async () => {
    await setup();

    expect(screen.getByRole('img', { name: 'Atti Chiari' })).toHaveAttribute(
      'src',
      'img/ac-logo.png',
    );
  });

  it('should introduce the Minerva database', async () => {
    await setup();

    expect(screen.getByRole('article')).toHaveTextContent(
      /La banca di dati Minerva/,
    );
  });

  it('should show the logo of each partner university', async () => {
    await setup();

    for (const name of [
      'Università di Genova',
      'Università degli studi della Tuscia',
      'Università del Salento',
      'Università degli studi di Firenze',
    ]) {
      expect(screen.getByRole('img', { name })).toBeInTheDocument();
    }
  });

  it('should navigate to the about page from the project link', async () => {
    const { user } = await setup();

    await user.click(
      screen.getByRole('link', { name: 'progetto PRIN AttiChiari' }),
    );

    expect(TestBed.inject(Router).url).toBe('/about');
  });
});
