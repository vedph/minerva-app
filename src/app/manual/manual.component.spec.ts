import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';

import { PqitaService } from '../services/pqita.service';
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

  it('should show the simple query language diagrams', async () => {
    await render(ManualComponent);

    for (const name of ['frase', 'oggetto', 'testo', 'caratteristiche']) {
      expect(
        screen.getByRole('img', {
          name: new RegExp(`^Diagramma d[a-z']*\\s?${name}`),
        }),
      ).toHaveAttribute('src', `img/pqita-${name}.svg`);
    }
  });

  it('should show examples translated as the simple search does', async () => {
    const { container } = await render(ManualComponent);
    const service = TestBed.inject(PqitaService);
    const normalize = (text: string | null) =>
      (text ?? '').replace(/\s+/g, ' ').trim();
    let count = 0;

    // each table with an example (or sentence) and a translation column
    for (const table of Array.from(container.querySelectorAll('table'))) {
      const headers = Array.from(table.querySelectorAll('thead th')).map((th) =>
        normalize(th.textContent),
      );
      const source = headers.findIndex((h) => h === 'esempio' || h === 'frase');
      const target = headers.indexOf('traduzione');
      if (source === -1 || target === -1) {
        continue;
      }
      for (const row of Array.from(table.querySelectorAll('tbody tr'))) {
        const cells = row.querySelectorAll('td');
        const sentence = normalize(cells[source].textContent);
        const query = normalize(cells[target].textContent);
        expect(service.convertQuery(sentence), sentence).toBe(query);
        count++;
      }
    }
    expect(count).toBeGreaterThan(20);
  });
});
