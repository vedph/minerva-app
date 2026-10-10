import { render, screen } from '@testing-library/angular';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  it('should show the main sections of the about page', async () => {
    await render(AboutComponent);

    for (const name of ['Introduzione', 'Atenei Partecipanti', 'Bibliografia']) {
      expect(
        screen.getByRole('heading', { level: 2, name }),
      ).toBeInTheDocument();
    }
  });

  it('should list the participating universities', async () => {
    await render(AboutComponent);

    const universities = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent?.trim());

    expect(universities).toEqual(
      expect.arrayContaining([
        'Università di GENOVA',
        'Università degli studi di FIRENZE',
        'Università del SALENTO',
        'Università degli studi della TUSCIA',
      ]),
    );
  });
});
