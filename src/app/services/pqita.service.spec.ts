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
});
