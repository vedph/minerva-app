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
      '[value%="cane:0.9"]'
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
    expect(
      service.convertQuery('trova la locuzione uguale a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value="pro tempore"]');
  });

  it('should convert trova la locuzione iniziante per "pro" to [$fp-lat] AND [_value^="pro"]', () => {
    expect(service.convertQuery('trova la locuzione iniziante per "pro"')).toBe(
      '[$fp-lat] AND [_value^="pro"]'
    );
  });

  it('should convert trova la locuzione terminante per "tempore" to [$fp-lat] AND [_value$="tempore"]', () => {
    expect(
      service.convertQuery('trova la locuzione terminante per "tempore"')
    ).toBe('[$fp-lat] AND [_value$="tempore"]');
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
    expect(
      service.convertQuery('trova la locuzione simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.8"]');
  });

  it('should convert trova la locuzione molto simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.9"]', () => {
    expect(
      service.convertQuery('trova la locuzione molto simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.9"]');
  });

  it('should convert trova la locuzione poco simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.5"]', () => {
    expect(
      service.convertQuery('trova la locuzione poco simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.5"]');
  });

  // lemma
  it('should convert lemma "cane" to [lemma="cane"]', () => {
    expect(service.convertQuery('lemma "cane"')).toBe('[lemma="cane"]');
  });

  it('should convert trova il lemma "cane" to [lemma="cane"]', () => {
    expect(service.convertQuery('trova il lemma "cane"')).toBe(
      '[lemma="cane"]'
    );
  });

  it('should convert trova il lemma uguale a "cane" to [lemma="cane"]', () => {
    expect(service.convertQuery('trova il lemma uguale a "cane"')).toBe(
      '[lemma="cane"]'
    );
  });

  it('should convert trova il lemma iniziante per "ca" to [lemma^="ca"]', () => {
    expect(service.convertQuery('trova il lemma iniziante per "ca"')).toBe(
      '[lemma^="ca"]'
    );
  });

  it('should convert trova il lemma terminante per "ne" to [lemma$="ne"]', () => {
    expect(service.convertQuery('trova il lemma terminante per "ne"')).toBe(
      '[lemma$="ne"]'
    );
  });

  it('should convert trova il lemma contenente "an" to [lemma*="an"]', () => {
    expect(service.convertQuery('trova il lemma contenente "an"')).toBe(
      '[lemma*="an"]'
    );
  });

  it('should convert trova il lemma corrispondente a "c?n?" to [lemma?="c?n?"]', () => {
    expect(service.convertQuery('trova il lemma corrispondente a "c?n?"')).toBe(
      '[lemma?="c?n?"]'
    );
  });

  it('should convert trova il lemma simile a "cane" to [lemma%="cane:0.8"]', () => {
    expect(service.convertQuery('trova il lemma simile a "cane"')).toBe(
      '[lemma%="cane:0.8"]'
    );
  });

  it('should convert trova il lemma molto simile a "cane" to [lemma%="cane:0.9"]', () => {
    expect(service.convertQuery('trova il lemma molto simile a "cane"')).toBe(
      '[lemma%="cane:0.9"]'
    );
  });

  it('should convert trova il lemma poco simile a "cane" to [lemma%="cane:0.5"]', () => {
    expect(service.convertQuery('trova il lemma poco simile a "cane"')).toBe(
      '[lemma%="cane:0.5"]'
    );
  });

  // forestierismo
  it('should convert forestierismo "dog" to [language<>"ita"] AND [value="dog"]', () => {
    expect(service.convertQuery('forestierismo "dog"')).toBe(
      '[language<>"ita"] AND [value="dog"]'
    );
  });

  it('should convert trova il forestierismo "dog" to [language<>"ita"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova il forestierismo "dog"')).toBe(
      '[language<>"ita"] AND [value="dog"]'
    );
  });

  it('should convert trova il forestierismo uguale a "dog" to [language<>"ita"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova il forestierismo uguale a "dog"')).toBe(
      '[language<>"ita"] AND [value="dog"]'
    );
  });

  it('should convert trova il forestierismo iniziante per "do" to [language<>"ita"] AND [value^="do"]', () => {
    expect(
      service.convertQuery('trova il forestierismo iniziante per "do"')
    ).toBe('[language<>"ita"] AND [value^="do"]');
  });

  it('should convert trova il forestierismo terminante per "og" to [language<>"ita"] AND [value$="og"]', () => {
    expect(
      service.convertQuery('trova il forestierismo terminante per "og"')
    ).toBe('[language<>"ita"] AND [value$="og"]');
  });

  it('should convert trova il forestierismo contenente "og" to [language<>"ita"] AND [value*="og"]', () => {
    expect(service.convertQuery('trova il forestierismo contenente "og"')).toBe(
      '[language<>"ita"] AND [value*="og"]'
    );
  });

  it('should convert trova il forestierismo corrispondente a "d?g" to [language<>"ita"] AND [value?="d?g"]', () => {
    expect(
      service.convertQuery('trova il forestierismo corrispondente a "d?g"')
    ).toBe('[language<>"ita"] AND [value?="d?g"]');
  });

  it('should convert trova il forestierismo simile a "dog" to [language<>"ita"] AND [value%="dog:0.8"]', () => {
    expect(service.convertQuery('trova il forestierismo simile a "dog"')).toBe(
      '[language<>"ita"] AND [value%="dog:0.8"]'
    );
  });

  it('should convert trova il forestierismo molto simile a "dog" to [language<>"ita"] AND [value%="dog:0.9"]', () => {
    expect(
      service.convertQuery('trova il forestierismo molto simile a "dog"')
    ).toBe('[language<>"ita"] AND [value%="dog:0.9"]');
  });

  it('should convert trova il forestierismo poco simile a "dog" to [language<>"ita"] AND [value%="dog:0.5"]', () => {
    expect(
      service.convertQuery('trova il forestierismo poco simile a "dog"')
    ).toBe('[language<>"ita"] AND [value%="dog:0.5"]');
  });

  // anglicismo
  it('should convert anglicismo "dog" to [language="eng"] AND [value="dog"]', () => {
    expect(service.convertQuery('anglicismo "dog"')).toBe(
      '[language="eng"] AND [value="dog"]'
    );
  });

  it('should convert trova l\'anglicismo "dog" to [language="eng"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova l\'anglicismo "dog"')).toBe(
      '[language="eng"] AND [value="dog"]'
    );
  });

  it('should convert trova l\'anglicismo uguale a "dog" to [language="eng"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova l\'anglicismo uguale a "dog"')).toBe(
      '[language="eng"] AND [value="dog"]'
    );
  });

  it('should convert trova l\'anglicismo iniziante per "do" to [language="eng"] AND [value^="do"]', () => {
    expect(service.convertQuery('trova l\'anglicismo iniziante per "do"')).toBe(
      '[language="eng"] AND [value^="do"]'
    );
  });

  it('should convert trova l\'anglicismo terminante per "og" to [language="eng"] AND [value$="og"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo terminante per "og"')
    ).toBe('[language="eng"] AND [value$="og"]');
  });

  it('should convert trova l\'anglicismo contenente "og" to [language="eng"] AND [value*="og"]', () => {
    expect(service.convertQuery('trova l\'anglicismo contenente "og"')).toBe(
      '[language="eng"] AND [value*="og"]'
    );
  });

  it('should convert trova l\'anglicismo corrispondente a "d?g" to [language="eng"] AND [value?="d?g"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo corrispondente a "d?g"')
    ).toBe('[language="eng"] AND [value?="d?g"]');
  });

  it('should convert trova l\'anglicismo simile a "dog" to [language="eng"] AND [value%="dog:0.8"]', () => {
    expect(service.convertQuery('trova l\'anglicismo simile a "dog"')).toBe(
      '[language="eng"] AND [value%="dog:0.8"]'
    );
  });

  it('should convert trova l\'anglicismo molto simile a "dog" to [language="eng"] AND [value%="dog:0.9"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo molto simile a "dog"')
    ).toBe('[language="eng"] AND [value%="dog:0.9"]');
  });

  it('should convert trova l\'anglicismo poco simile a "dog" to [language="eng"] AND [value%="dog:0.5"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo poco simile a "dog"')
    ).toBe('[language="eng"] AND [value%="dog:0.5"]');
  });

  // latinismo
  it('should convert latinismo "canis" to [language="lat"] AND [value="canis"]', () => {
    expect(service.convertQuery('latinismo "canis"')).toBe(
      '[language="lat"] AND [value="canis"]'
    );
  });

  it('should convert trova il latinismo "canis" to [language="lat"] AND [value="canis"]', () => {
    expect(service.convertQuery('trova il latinismo "canis"')).toBe(
      '[language="lat"] AND [value="canis"]'
    );
  });

  it('should convert trova il latinismo uguale a "canis" to [language="lat"] AND [value="canis"]', () => {
    expect(service.convertQuery('trova il latinismo uguale a "canis"')).toBe(
      '[language="lat"] AND [value="canis"]'
    );
  });

  it('should convert trova il latinismo iniziante per "ca" to [language="lat"] AND [value^="ca"]', () => {
    expect(service.convertQuery('trova il latinismo iniziante per "ca"')).toBe(
      '[language="lat"] AND [value^="ca"]'
    );
  });

  it('should convert trova il latinismo terminante per "is" to [language="lat"] AND [value$="is"]', () => {
    expect(service.convertQuery('trova il latinismo terminante per "is"')).toBe(
      '[language="lat"] AND [value$="is"]'
    );
  });

  it('should convert trova il latinismo contenente "an" to [language="lat"] AND [value*="an"]', () => {
    expect(service.convertQuery('trova il latinismo contenente "an"')).toBe(
      '[language="lat"] AND [value*="an"]'
    );
  });

  it('should convert trova il latinismo corrispondente a "c?n?" to [language="lat"] AND [value?="c?n?"]', () => {
    expect(
      service.convertQuery('trova il latinismo corrispondente a "c?n?"')
    ).toBe('[language="lat"] AND [value?="c?n?"]');
  });

  it('should convert trova il latinismo simile a "canis" to [language="lat"] AND [value%="canis:0.8"]', () => {
    expect(service.convertQuery('trova il latinismo simile a "canis"')).toBe(
      '[language="lat"] AND [value%="canis:0.8"]'
    );
  });

  it('should convert trova il latinismo molto simile a "canis" to [language="lat"] AND [value%="canis:0.9"]', () => {
    expect(
      service.convertQuery('trova il latinismo molto simile a "canis"')
    ).toBe('[language="lat"] AND [value%="canis:0.9"]');
  });

  it('should convert trova il latinismo poco simile a "canis" to [language="lat"] AND [value%="canis:0.5"]', () => {
    expect(
      service.convertQuery('trova il latinismo poco simile a "canis"')
    ).toBe('[language="lat"] AND [value%="canis:0.5"]');
  });

  // set: parole
  // ADJ ADP ADV AUX CCONJ DET NOUN NUM PRON PROPN SCONJ SYM VERB X
  it('should convert tutte le parole come aggettivo to [pos="ADJ"]', () => {
    expect(service.convertQuery('tutte le parole come aggettivo')).toBe(
      '[pos="ADJ"]'
    );
  });

  it('should convert tutte le parole come apposizione to [pos="ADP"]', () => {
    expect(service.convertQuery('tutte le parole come apposizione')).toBe(
      '[pos="ADP"]'
    );
  });

  it('should convert tutte le parole come avverbio to [pos="ADV"]', () => {
    expect(service.convertQuery('tutte le parole come avverbio')).toBe(
      '[pos="ADV"]'
    );
  });

  it('should convert tutte le parole come ausiliare to [pos="AUX"]', () => {
    expect(service.convertQuery('tutte le parole come ausiliare')).toBe(
      '[pos="AUX"]'
    );
  });

  it('should convert tutte le parole come congiunzione coordinante to [pos="CCONJ"]', () => {
    expect(
      service.convertQuery('tutte le parole come congiunzione coordinante')
    ).toBe('[pos="CCONJ"]');
  });

  it('should convert tutte le parole come determinante to [pos="DET"]', () => {
    expect(service.convertQuery('tutte le parole come determinante')).toBe(
      '[pos="DET"]'
    );
  });

  it('should convert tutte le parole come sostantivo to [pos="NOUN"]', () => {
    expect(service.convertQuery('tutte le parole come sostantivo')).toBe(
      '[pos="NOUN"]'
    );
  });

  it('should convert tutte le parole come numero to [pos="NUM"]', () => {
    expect(service.convertQuery('tutte le parole come numero')).toBe('[pos="NUM"]');
  });

  it('should convert tutte le parole come pronome to [pos="PRON"]', () => {
    expect(service.convertQuery('tutte le parole come pronome')).toBe(
      '[pos="PRON"]'
    );
  });

  it('should convert tutte le parole come nome proprio to [pos="PROPN"]', () => {
    expect(service.convertQuery('tutte le parole come nome proprio')).toBe(
      '[pos="PROPN"]'
    );
  });

  it('should convert tutte le parole come congiunzione subordinante to [pos="SCONJ"]', () => {
    expect(
      service.convertQuery('tutte le parole come congiunzione subordinante')
    ).toBe('[pos="SCONJ"]');
  });

  it('should convert tutte le parole come simbolo to [pos="SYM"]', () => {
    expect(service.convertQuery('tutte le parole come simbolo')).toBe('[pos="SYM"]');
  });

  it('should convert tutte le parole come verbo to [pos="VERB"]', () => {
    expect(service.convertQuery('tutte le parole come verbo')).toBe(
      '[pos="VERB"]'
    );
  });

  it('should convert tutte le parole come altro to [pos="X"]', () => {
    expect(service.convertQuery('tutte le parole come altro')).toBe('[pos="X"]');
  });
});
