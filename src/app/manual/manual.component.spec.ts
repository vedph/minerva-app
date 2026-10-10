import { render, screen } from '@testing-library/angular';

import { ManualComponent } from './manual.component';

describe('ManualComponent', () => {
  it('should show the user guide title', async () => {
    await render(ManualComponent);

    expect(screen.getByText('Guida utente')).toBeInTheDocument();
  });

  it('should show a section for each part of the guide', async () => {
    await render(ManualComponent);

    for (const name of [
      'Introduzione',
      'Indice',
      'Ricerca semplice',
      'Ricerca avanzata',
    ]) {
      expect(
        screen.getByRole('heading', { level: 3, name }),
      ).toBeInTheDocument();
    }
  });

  it('should show the simple query language diagram', async () => {
    await render(ManualComponent);

    expect(
      screen.getByRole('img', { name: 'Linguaggio di interrogazione semplice' }),
    ).toHaveAttribute('src', 'img/pqita.png');
  });
});
