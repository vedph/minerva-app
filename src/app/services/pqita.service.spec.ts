import { TestBed } from '@angular/core/testing';

import { PqitaService } from './pqita.service';

describe('PqitaService', () => {
  let service: PqitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert parola "cane" to [value="cane"]', () => {
    expect(service.convertQuery('parola "cane"')).toBe(
      '[value="cane"]'
    );
  });

  it('should convert trova la parola "cane" to [value="cane"]', () => {
    expect(service.convertQuery('trova la parola "cane"')).toBe(
      '[value="cane"]'
    );
  });
});
