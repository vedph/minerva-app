import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { provideFakeEnv } from '../testing/fake-env';
import { AppComponent } from './app.component';

@Component({ template: 'page: {{ name }}' })
class PageStubComponent {
  public name = 'stub';
}

async function setup(env: Record<string, unknown> = { version: '1.2.3' }) {
  const view = await render(AppComponent, {
    routes: ['home', 'index', 'search', 'manual', 'stats', 'about'].map(
      (path) => ({ path, component: PageStubComponent }),
    ),
    providers: [provideFakeEnv(env)],
  });
  return { ...view, user: userEvent.setup(), router: TestBed.inject(Router) };
}

describe('AppComponent', () => {
  it('should show the version from the environment in the footer', async () => {
    await setup();

    expect(screen.getByRole('contentinfo')).toHaveTextContent('version 1.2.3');
  });

  it('should show no version when the environment has none', async () => {
    await setup({});

    expect(screen.getByRole('contentinfo')).toHaveTextContent(/version\s*$/);
  });

  it('should show the contact addresses in the footer', async () => {
    await setup();

    for (const address of [
      'attichiari@unige.it',
      'attichiari@unisalento.it',
      'attichiari@unitus.it',
    ]) {
      expect(screen.getByRole('link', { name: address })).toHaveAttribute(
        'href',
        `mailto:${address}`,
      );
    }
  });

  it('should navigate home from the logo', async () => {
    const { user, router } = await setup();

    await user.click(screen.getByRole('link', { name: 'Minerva' }));

    expect(router.url).toBe('/home');
  });

  it.each([
    ['Index', '/index'],
    ['Search', '/search'],
    ['Help', '/manual'],
  ])('should navigate from the %s toolbar button', async (name, url) => {
    const { user, router } = await setup();

    await user.click(screen.getByRole('button', { name }));

    expect(router.url).toBe(url);
  });

  it.each([
    ['Statistics', '/stats'],
    ['About the project', '/about'],
  ])('should navigate from the %s info menu item', async (name, url) => {
    const { user, router } = await setup();

    await user.click(screen.getByRole('button', { name: 'Info' }));
    await user.click(await screen.findByRole('menuitem', { name }));

    expect(router.url).toBe(url);
  });

  it('should navigate to the about page from the footer', async () => {
    const { user, router } = await setup();

    await user.click(screen.getByRole('link', { name: 'AttiChiari' }));

    expect(router.url).toBe('/about');
  });

  it('should render the routed page in the main area', async () => {
    const { user } = await setup();

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(await screen.findByRole('main')).toHaveTextContent('page: stub');
  });
});
