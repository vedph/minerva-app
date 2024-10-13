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

  // parola
  it('should convert parola "cane" to [value="cane"]', () => {
    expect(service.convertQuery('parola "cane"')).toBe('[value="cane"]');
  });

  it('should convert trova la parola "cane" to [value="cane"]', () => {
    expect(service.convertQuery('trova la parola "cane"')).toBe(
      '[value="cane"]'
    );
  });

  it('should convert trova la parola uguale a "cane" to [value="cane"]', () => {
    expect(service.convertQuery('trova la parola uguale a "cane"')).toBe(
      '[value="cane"]'
    );
  });

  it('should convert trova la parola iniziante per "ca" to [value^="ca"]', () => {
    expect(service.convertQuery('trova la parola iniziante per "ca"')).toBe(
      '[value^="ca"]'
    );
  });

  it('should convert trova la parola terminante per "ne" to [value$="ne"]', () => {
    expect(service.convertQuery('trova la parola terminante per "ne"')).toBe(
      '[value$="ne"]'
    );
  });

  it('should convert trova la parola contenente "an" to [value*="an"]', () => {
    expect(service.convertQuery('trova la parola contenente "an"')).toBe(
      '[value*="an"]'
    );
  });

  it('should convert trova la parola corrispondente a "c?n?" to [value?="c?n?"]', () => {
    expect(
      service.convertQuery('trova la parola corrispondente a "c?n?"')
    ).toBe('[value?="c?n?"]');
  });

  it('should convert trova la parola simile a "cane" to [value%="cane:0.8"]', () => {
    expect(service.convertQuery('trova la parola simile a "cane"')).toBe(
      '[value%="cane:0.8"]'
    );
  });

  it('should convert trova la parola molto simile a "cane" to [value%="cane:0.9"]', () => {
    expect(service.convertQuery('trova la parola molto simile a "cane"')).toBe(
      '[value%="cane:0.8"]'
    );
  });

  it('should convert trova la parola poco simile a "cane" to [value%="cane:0.5"]', () => {
    expect(service.convertQuery('trova la parola poco simile a "cane"')).toBe(
      '[value%="cane:0.5"]'
    );
  });

  // locuzione
  it('should convert locuzione "pro tempore" to [$fp-lat] AND [_value="pro tempore"]', () => {
    expect(service.convertQuery('locuzione "pro tempore"')).toBe(
      '[$fp-lat] AND [_value="pro tempore"]'
    );
  });

  it('should convert trova la locuzione "pro tempore" to [$fp-lat] AND [_value="pro tempore"]', () => {
    expect(service.convertQuery('trova la locuzione "pro tempore"')).toBe(
      '[$fp-lat] AND [_value="pro tempore"]'
    );
  });

  it('should convert trova la locuzione uguale a "pro tempore" to [$fp-lat] AND [_value="pro tempore"]', () => {
    expect(service.convertQuery('trova la locuzione uguale a "pro tempore"')).toBe(
      '[$fp-lat] AND [_value="pro tempore"]'
    );
  });

  it('should convert trova la locuzione iniziante per "pro" to [$fp-lat] AND [_value^="pro"]', () => {
    expect(service.convertQuery('trova la locuzione iniziante per "pro"')).toBe(
      '[$fp-lat] AND [_value^="pro"]'
    );
  });

  it('should convert trova la locuzione terminante per "tempore" to [$fp-lat] AND [_value$="tempore"]', () => {
    expect(service.convertQuery('trova la locuzione terminante per "tempore"')).toBe(
      '[$fp-lat] AND [_value$="tempore"]'
    );
  });

  it('should convert trova la locuzione contenente "temp" to [$fp-lat] AND [_value*="temp"]', () => {
    expect(service.convertQuery('trova la locuzione contenente "temp"')).toBe(
      '[$fp-lat] AND [_value*="temp"]'
    );
  });

  it('should convert trova la locuzione corrispondente a "pro tempore" to [$fp-lat] AND [_value?="pro tempore"]', () => {
    expect(
      service.convertQuery('trova la locuzione corrispondente a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value?="pro tempore"]');
  });

  it('should convert trova la locuzione simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.8"]', () => {
    expect(service.convertQuery('trova la locuzione simile a "pro tempore"')).toBe(
      '[$fp-lat] AND [_value%="pro tempore:0.8"]'
    );
  });

  it('should convert trova la locuzione molto simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.9"]', () => {
    expect(
      service.convertQuery('trova la locuzione molto simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.8"]');
  });

  it('should convert trova la locuzione poco simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.5"]', () => {
    expect(
      service.convertQuery('trova la locuzione poco simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.5"]');
  });
});
