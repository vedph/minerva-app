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

  //#region single word query
  it('should convert cane to [value="cane"]', () => {
    expect(service.convertQuery('cane')).toBe('[value="cane"]');
  });
  it('should convert "cane" to [value="cane"]', () => {
    expect(service.convertQuery('"cane"')).toBe('[value="cane"]');
  });
  it('should convert cane with left spc to [value="cane"]', () => {
    expect(service.convertQuery('  cane')).toBe('[value="cane"]');
  });
  it('should convert cane with right spc to [value="cane"]', () => {
    expect(service.convertQuery('cane  ')).toBe('[value="cane"]');
  });
  it('should convert spc + "cane" to [value="cane"]', () => {
    expect(service.convertQuery(' "cane"')).toBe('[value="cane"]');
  });
  it('should convert "cane" + spc to [value="cane"]', () => {
    expect(service.convertQuery(' "cane" ')).toBe('[value="cane"]');
  });
  //#endregion

  //#region parola
  it('should convert parola "cane" to [value="cane"]', () => {
    expect(service.convertQuery('parola "cane"')).toBe('[value="cane"]');
  });
  it('should supply quotes in parola cane', () => {
    expect(service.supplyQuotes('parola cane')).toBe('parola "cane"');
  });

  it('should convert trova la parola "cane" to [value="cane"]', () => {
    expect(service.convertQuery('trova la parola "cane"')).toBe(
      '[value="cane"]'
    );
  });
  it('should supply quotes in trova la parola cane', () => {
    expect(service.supplyQuotes('trova la parola cane')).toBe(
      'trova la parola "cane"'
    );
  });

  // uguale a
  it('should convert trova la parola uguale a "cane" to [value="cane"]', () => {
    expect(service.convertQuery('trova la parola uguale a "cane"')).toBe(
      '[value="cane"]'
    );
  });
  it('should supply quotes in trova la parola uguale a cane', () => {
    expect(service.supplyQuotes('trova la parola uguale a cane')).toBe(
      'trova la parola uguale a "cane"'
    );
  });

  // iniziante per
  it('should convert trova la parola iniziante per "ca" to [value^="ca"]', () => {
    expect(service.convertQuery('trova la parola iniziante per "ca"')).toBe(
      '[value^="ca"]'
    );
  });
  it('should supply quotes in trova la parola iniziante per ca', () => {
    expect(service.supplyQuotes('trova la parola iniziante per ca')).toBe(
      'trova la parola iniziante per "ca"'
    );
  });

  // terminante per
  it('should convert trova la parola terminante per "ne" to [value$="ne"]', () => {
    expect(service.convertQuery('trova la parola terminante per "ne"')).toBe(
      '[value$="ne"]'
    );
  });
  it('should supply quotes in trova la parola terminante per ne', () => {
    expect(service.supplyQuotes('trova la parola terminante per ne')).toBe(
      'trova la parola terminante per "ne"'
    );
  });

  // contenente
  it('should convert trova la parola contenente "an" to [value*="an"]', () => {
    expect(service.convertQuery('trova la parola contenente "an"')).toBe(
      '[value*="an"]'
    );
  });
  it('should supply quotes in trova la parola contenente an', () => {
    expect(service.supplyQuotes('trova la parola contenente an')).toBe(
      'trova la parola contenente "an"'
    );
  });

  // corrispondente a
  it('should convert trova la parola corrispondente a "c?n?" to [value?="c?n?"]', () => {
    expect(
      service.convertQuery('trova la parola corrispondente a "c?n?"')
    ).toBe('[value?="c?n?"]');
  });
  it('should supply quotes in trova la parola corrispondente a c?n?', () => {
    expect(service.supplyQuotes('trova la parola corrispondente a c?n?')).toBe(
      'trova la parola corrispondente a "c?n?"'
    );
  });

  // simile a
  it('should convert trova la parola simile a "cane" to [value%="cane:0.8"]', () => {
    expect(service.convertQuery('trova la parola simile a "cane"')).toBe(
      '[value%="cane:0.8"]'
    );
  });
  it('should supply quotes in trova la parola simile a cane', () => {
    expect(service.supplyQuotes('trova la parola simile a cane')).toBe(
      'trova la parola simile a "cane"'
    );
  });

  // molto simile a
  it('should convert trova la parola molto simile a "cane" to [value%="cane:0.9"]', () => {
    expect(service.convertQuery('trova la parola molto simile a "cane"')).toBe(
      '[value%="cane:0.9"]'
    );
  });
  it('should supply quotes in trova la parola molto simile a cane', () => {
    expect(service.supplyQuotes('trova la parola molto simile a cane')).toBe(
      'trova la parola molto simile a "cane"'
    );
  });

  // poco simile a
  it('should convert trova la parola poco simile a "cane" to [value%="cane:0.5"]', () => {
    expect(service.convertQuery('trova la parola poco simile a "cane"')).toBe(
      '[value%="cane:0.5"]'
    );
  });
  it('should supply quotes in trova la parola poco simile a cane', () => {
    expect(service.supplyQuotes('trova la parola poco simile a cane')).toBe(
      'trova la parola poco simile a "cane"'
    );
  });

  // parola + come: aggettivo
  it('should convert parola "cane" come aggettivo to [value="cane"] AND [pos="ADJ"]', () => {
    expect(service.convertQuery('parola "cane" come aggettivo')).toBe(
      '[value="cane"] AND [pos="ADJ"]'
    );
  });
  // parola + come: apposizione
  it('should convert parola "cane" come apposizione to [value="cane"] AND [pos="ADP"]', () => {
    expect(service.convertQuery('parola "cane" come apposizione')).toBe(
      '[value="cane"] AND [pos="ADP"]'
    );
  });
  // parola + come: avverbio
  it('should convert parola "cane" come avverbio to [value="cane"] AND [pos="ADV"]', () => {
    expect(service.convertQuery('parola "cane" come avverbio')).toBe(
      '[value="cane"] AND [pos="ADV"]'
    );
  });
  // parola + come: ausiliare
  it('should convert parola "cane" come ausiliare to [value="cane"] AND [pos="AUX"]', () => {
    expect(service.convertQuery('parola "cane" come ausiliare')).toBe(
      '[value="cane"] AND [pos="AUX"]'
    );
  });
  // parola + come: congiunzione coordinante
  // parola + come: determinante
  // parola + come: sostantivo
  it('should convert parola "cane" come sostantivo to [value="cane"] AND [pos="NOUN"]', () => {
    expect(service.convertQuery('parola "cane" come sostantivo')).toBe(
      '[value="cane"] AND [pos="NOUN"]'
    );
  });
  // parola + come: numero
  it('should convert parola "cane" come numero to [value="cane"] AND [pos="NUM"]', () => {
    expect(service.convertQuery('parola "cane" come numero')).toBe(
      '[value="cane"] AND [pos="NUM"]'
    );
  });
  // parola + come: pronome
  it('should convert parola "cane" come pronome to [value="cane"] AND [pos="PRON"]', () => {
    expect(service.convertQuery('parola "cane" come pronome')).toBe(
      '[value="cane"] AND [pos="PRON"]'
    );
  });
  // parola + come: nome proprio
  it('should convert parola "cane" come nome proprio to [value="cane"] AND [pos="PROPN"]', () => {
    expect(service.convertQuery('parola "cane" come nome proprio')).toBe(
      '[value="cane"] AND [pos="PROPN"]'
    );
  });
  // parola + come: congiunzione subordinante
  it('should convert parola "cane" come congiunzione subordinante to [value="cane"] AND [pos="SCONJ"]', () => {
    expect(
      service.convertQuery('parola "cane" come congiunzione subordinante')
    ).toBe('[value="cane"] AND [pos="SCONJ"]');
  });
  // parola + come: simbolo
  it('should convert parola "cane" come simbolo to [value="cane"] AND [pos="SYM"]', () => {
    expect(service.convertQuery('parola "cane" come simbolo')).toBe(
      '[value="cane"] AND [pos="SYM"]'
    );
  });
  // parola + come: verbo
  it('should convert parola "cane" come verbo to [value="cane"] AND [pos="VERB"]', () => {
    expect(service.convertQuery('parola "cane" come verbo')).toBe(
      '[value="cane"] AND [pos="VERB"]'
    );
  });
  // parola + come: altro
  it('should convert parola "cane" come altro to [value="cane"] AND [pos="X"]', () => {
    expect(service.convertQuery('parola "cane" come altro')).toBe(
      '[value="cane"] AND [pos="X"]'
    );
  });
  // parola + come: verbform=inf
  it('should convert parola "cane" come infinito to [value="cane"] AND [verbform="inf"]', () => {
    expect(service.convertQuery('parola "cane" come infinito')).toBe(
      '[value="cane"] AND [verbform="inf"]'
    );
  });
  // parola + come: verbform=ger
  it('should convert parola "cane" come gerundio to [value="cane"] AND [verbform="ger"]', () => {
    expect(service.convertQuery('parola "cane" come gerundio')).toBe(
      '[value="cane"] AND [verbform="ger"]'
    );
  });
  // parola + come: verbform=part
  it('should convert parola "cane" come participio to [value="cane"] AND [verbform="part"]', () => {
    expect(service.convertQuery('parola "cane" come participio')).toBe(
      '[value="cane"] AND [verbform="part"]'
    );
  });

  // parola + come: mood=ind
  it('should convert parola "cane" come indicativo to [value="cane"] AND [mood="ind"]', () => {
    expect(service.convertQuery('parola "cane" come indicativo')).toBe(
      '[value="cane"] AND [mood="ind"]'
    );
  });
  // parola + come: mood=sub
  it('should convert parola "cane" come congiuntivo to [value="cane"] AND [mood="sub"]', () => {
    expect(service.convertQuery('parola "cane" come congiuntivo')).toBe(
      '[value="cane"] AND [mood="sub"]'
    );
  });
  // parola + come: mood=cnd
  it('should convert parola "cane" come condizionale to [value="cane"] AND [mood="cnd"]', () => {
    expect(service.convertQuery('parola "cane" come condizionale')).toBe(
      '[value="cane"] AND [mood="cnd"]'
    );
  });
  // parola + come: mood=imp
  it('should convert parola "cane" come imperativo to [value="cane"] AND [mood="imp"]', () => {
    expect(service.convertQuery('parola "cane" come imperativo')).toBe(
      '[value="cane"] AND [mood="imp"]'
    );
  });
  // parola + come: definite=def
  it('should convert parola "cane" come modo definito to [value="cane"] AND [definite="def"]', () => {
    expect(service.convertQuery('parola "cane" come modo definito')).toBe(
      '[value="cane"] AND [definite="def"]'
    );
  });
  // parola + come: definite=ind
  it('should convert parola "cane" come modo indefinito to [value="cane"] AND [definite="ind"]', () => {
    expect(service.convertQuery('parola "cane" come modo indefinito')).toBe(
      '[value="cane"] AND [definite="ind"]'
    );
  });

  // parola + come: tense=pres
  it('should convert parola "cane" come presente to [value="cane"] AND [tense="pres"]', () => {
    expect(service.convertQuery('parola "cane" come presente')).toBe(
      '[value="cane"] AND [tense="pres"]'
    );
  });
  // parola + come: tense=past
  it('should convert parola "cane" come passato to [value="cane"] AND [tense="past"]', () => {
    expect(service.convertQuery('parola "cane" come passato')).toBe(
      '[value="cane"] AND [tense="past"]'
    );
  });
  // parola + come: tense=fut
  it('should convert parola "cane" come futuro to [value="cane"] AND [tense="fut"]', () => {
    expect(service.convertQuery('parola "cane" come futuro')).toBe(
      '[value="cane"] AND [tense="fut"]'
    );
  });
  // parola + come: person=1
  it('should convert parola "cane" come prima persona to [value="cane"] AND [person="1"]', () => {
    expect(service.convertQuery('parola "cane" come prima persona')).toBe(
      '[value="cane"] AND [person="1"]'
    );
  });
  // parola + come: person=2
  it('should convert parola "cane" come seconda persona to [value="cane"] AND [person="2"]', () => {
    expect(service.convertQuery('parola "cane" come seconda persona')).toBe(
      '[value="cane"] AND [person="2"]'
    );
  });
  // parola + come: person=3
  it('should convert parola "cane" come terza persona to [value="cane"] AND [person="3"]', () => {
    expect(service.convertQuery('parola "cane" come terza persona')).toBe(
      '[value="cane"] AND [person="3"]'
    );
  });
  // parola + come: number=sing
  it('should convert parola "cane" come singolare to [value="cane"] AND [number="sing"]', () => {
    expect(service.convertQuery('parola "cane" come singolare')).toBe(
      '[value="cane"] AND [number="sing"]'
    );
  });
  // parola + come: number=plur
  it('should convert parola "cane" come plurale to [value="cane"] AND [number="plur"]', () => {
    expect(service.convertQuery('parola "cane" come plurale')).toBe(
      '[value="cane"] AND [number="plur"]'
    );
  });
  // parola + come: gender=masc
  it('should convert parola "cane" come maschile to [value="cane"] AND [gender="masc"]', () => {
    expect(service.convertQuery('parola "cane" come maschile')).toBe(
      '[value="cane"] AND [gender="masc"]'
    );
  });
  // parola + come: gender=fem
  it('should convert parola "cane" come femminile to [value="cane"] AND [gender="fem"]', () => {
    expect(service.convertQuery('parola "cane" come femminile')).toBe(
      '[value="cane"] AND [gender="fem"]'
    );
  });

  // parola + come: clitic=yes
  it('should convert parola "cane" come clitica to [value="cane"] AND [clitic="yes"]', () => {
    expect(service.convertQuery('parola "cane" come clitica')).toBe(
      '[value="cane"] AND [clitic="yes"]'
    );
  });

  // parola + come: poss=yes
  it('should convert parola "cane" come possessivo to [value="cane"] AND [poss="yes"]', () => {
    expect(service.convertQuery('parola "cane" come possessivo')).toBe(
      '[value="cane"] AND [poss="yes"]'
    );
  });

  // parola + come: prontype=art
  it('should convert parola "cane" come articolo to [value="cane"] AND [prontype="art"]', () => {
    expect(service.convertQuery('parola "cane" come articolo')).toBe(
      '[value="cane"] AND [prontype="art"]'
    );
  });
  // parola + come: prontype=dem
  it('should convert parola "cane" come pronome dimostrativo to [value="cane"] AND [prontype="dem"]', () => {
    expect(
      service.convertQuery('parola "cane" come pronome dimostrativo')
    ).toBe('[value="cane"] AND [prontype="dem"]');
  });
  // parola + come: prontype=ind
  it('should convert parola "cane" come pronome indefinito to [value="cane"] AND [prontype="ind"]', () => {
    expect(service.convertQuery('parola "cane" come pronome indefinito')).toBe(
      '[value="cane"] AND [prontype="ind"]'
    );
  });
  // parola + come: prontype=int
  it('should convert parola "cane" come pronome interrogativo to [value="cane"] AND [prontype="int"]', () => {
    expect(
      service.convertQuery('parola "cane" come pronome interrogativo')
    ).toBe('[value="cane"] AND [prontype="int"]');
  });
  // parola + come: prontype=neg
  it('should convert parola "cane" come pronome negativo to [value="cane"] AND [prontype="neg"]', () => {
    expect(service.convertQuery('parola "cane" come pronome negativo')).toBe(
      '[value="cane"] AND [prontype="neg"]'
    );
  });
  // parola + come: prontype=prs
  it('should convert parola "cane" come pronome personale to [value="cane"] AND [prontype="prs"]', () => {
    expect(service.convertQuery('parola "cane" come pronome personale')).toBe(
      '[value="cane"] AND [prontype="prs"]'
    );
  });
  // parola + come: prontype=rel
  it('should convert parola "cane" come pronome relativo to [value="cane"] AND [prontype="rel"]', () => {
    expect(service.convertQuery('parola "cane" come pronome relativo')).toBe(
      '[value="cane"] AND [prontype="rel"]'
    );
  });
  // parola + come: prontype=tot
  it('should convert parola "cane" come pronome totalizzante to [value="cane"] AND [prontype="tot"]', () => {
    expect(
      service.convertQuery('parola "cane" come pronome totalizzante')
    ).toBe('[value="cane"] AND [prontype="tot"]');
  });

  // parola + come: degree=cmp
  it('should convert parola "cane" come comparativo to [value="cane"] AND [degree="cmp"]', () => {
    expect(service.convertQuery('parola "cane" come comparativo')).toBe(
      '[value="cane"] AND [degree="cmp"]'
    );
  });
  // parola + come: degree=abs
  it('should convert parola "cane" come superlativo to [value="cane"] AND [degree="abs"]', () => {
    expect(service.convertQuery('parola "cane" come superlativo')).toBe(
      '[value="cane"] AND [degree="abs"]'
    );
  });

  // parola + in
  it('should convert parola "cane" in grassetto to [value="cane"] AND [b="1"]', () => {
    expect(service.convertQuery('parola "cane" in grassetto')).toBe(
      '[value="cane"] AND [b="1"]'
    );
  });

  // parola + vicino a
  it('should convert parola "cane" vicino alla parola "bello" to [value="cane"] NEAR(m=3,s=snt) [value="bello"]', () => {
    expect(
      service.convertQuery('parola "cane" vicino alla parola "bello"')
    ).toBe('[value="cane"] NEAR(m=3,s=snt) [value="bello"]');
  });

  // parola + attaccato a
  it('should convert parola "cane" attaccata alla parola "bello" to [value="cane"] NEAR(m=0,s=snt) [value="bello"]', () => {
    expect(
      service.convertQuery('parola "cane" attaccata alla parola "bello"')
    ).toBe('[value="cane"] NEAR(m=0,s=snt) [value="bello"]');
  });

  // parola + prima di
  it('should convert parola "cane" prima della parola "bello" to [value="cane"] BEFORE(m=3,s=snt) [value="bello"]', () => {
    expect(
      service.convertQuery('parola "cane" prima della parola "bello"')
    ).toBe('[value="cane"] BEFORE(m=3,s=snt) [value="bello"]');
  });

  // parola + dopo
  it('should convert parola "cane" dopo la parola "bello" to [value="cane"] AFTER(m=3,s=snt) [value="bello"]', () => {
    expect(
      service.convertQuery('parola "cane" dopo la parola "bello"')
    ).toBe('[value="cane"] AFTER(m=3,s=snt) [value="bello"]');
  });
  //#endregion

  //#region locuzione
  it('should convert locuzione "pro tempore" to [$fp-lat] AND [_value="pro tempore"]', () => {
    expect(service.convertQuery('locuzione "pro tempore"')).toBe(
      '[$fp-lat] AND [_value="pro tempore"]'
    );
  });
  it('should supply quotes in locuzione pro tempore', () => {
    expect(service.supplyQuotes('locuzione pro tempore')).toBe(
      'locuzione "pro tempore"'
    );
  });

  it('should convert trova la locuzione "pro tempore" to [$fp-lat] AND [_value="pro tempore"]', () => {
    expect(service.convertQuery('trova la locuzione "pro tempore"')).toBe(
      '[$fp-lat] AND [_value="pro tempore"]'
    );
  });
  it('should supply quotes in trova la locuzione pro tempore', () => {
    expect(service.supplyQuotes('trova la locuzione pro tempore')).toBe(
      'trova la locuzione "pro tempore"'
    );
  });

  // uguale a
  it('should convert trova la locuzione uguale a "pro tempore" to [$fp-lat] AND [_value="pro tempore"]', () => {
    expect(
      service.convertQuery('trova la locuzione uguale a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value="pro tempore"]');
  });
  it('should supply quotes in trova la locuzione uguale a pro tempore', () => {
    expect(
      service.supplyQuotes('trova la locuzione uguale a pro tempore')
    ).toBe('trova la locuzione uguale a "pro tempore"');
  });

  // iniziante per
  it('should convert trova la locuzione iniziante per "pro" to [$fp-lat] AND [_value^="pro"]', () => {
    expect(service.convertQuery('trova la locuzione iniziante per "pro"')).toBe(
      '[$fp-lat] AND [_value^="pro"]'
    );
  });
  it('should supply quotes in trova la locuzione iniziante per pro', () => {
    expect(service.supplyQuotes('trova la locuzione iniziante per pro')).toBe(
      'trova la locuzione iniziante per "pro"'
    );
  });

  // terminante per
  it('should convert trova la locuzione terminante per "tempore" to [$fp-lat] AND [_value$="tempore"]', () => {
    expect(
      service.convertQuery('trova la locuzione terminante per "tempore"')
    ).toBe('[$fp-lat] AND [_value$="tempore"]');
  });
  it('should supply quotes in trova la locuzione terminante per tempore', () => {
    expect(
      service.supplyQuotes('trova la locuzione terminante per tempore')
    ).toBe('trova la locuzione terminante per "tempore"');
  });

  // contenente
  it('should convert trova la locuzione contenente "temp" to [$fp-lat] AND [_value*="temp"]', () => {
    expect(service.convertQuery('trova la locuzione contenente "temp"')).toBe(
      '[$fp-lat] AND [_value*="temp"]'
    );
  });
  it('should supply quotes in trova la locuzione contenente temp', () => {
    expect(service.supplyQuotes('trova la locuzione contenente temp')).toBe(
      'trova la locuzione contenente "temp"'
    );
  });

  // corrispondente a
  it('should convert trova la locuzione corrispondente a "pro tempore" to [$fp-lat] AND [_value?="pro tempore"]', () => {
    expect(
      service.convertQuery('trova la locuzione corrispondente a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value?="pro tempore"]');
  });
  it('should supply quotes in trova la locuzione corrispondente a pro tempore', () => {
    expect(
      service.supplyQuotes('trova la locuzione corrispondente a pro tempore')
    ).toBe('trova la locuzione corrispondente a "pro tempore"');
  });

  // simile a
  it('should convert trova la locuzione simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.8"]', () => {
    expect(
      service.convertQuery('trova la locuzione simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.8"]');
  });
  it('should supply quotes in trova la locuzione simile a pro tempore', () => {
    expect(
      service.supplyQuotes('trova la locuzione simile a pro tempore')
    ).toBe('trova la locuzione simile a "pro tempore"');
  });

  // molto simile a
  it('should convert trova la locuzione molto simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.9"]', () => {
    expect(
      service.convertQuery('trova la locuzione molto simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.9"]');
  });
  it('should supply quotes in trova la locuzione molto simile a pro tempore', () => {
    expect(
      service.supplyQuotes('trova la locuzione molto simile a pro tempore')
    ).toBe('trova la locuzione molto simile a "pro tempore"');
  });

  // poco simile a
  it('should convert trova la locuzione poco simile a "pro tempore" to [$fp-lat] AND [_value%="pro tempore:0.5"]', () => {
    expect(
      service.convertQuery('trova la locuzione poco simile a "pro tempore"')
    ).toBe('[$fp-lat] AND [_value%="pro tempore:0.5"]');
  });
  it('should supply quotes in trova la locuzione poco simile a pro tempore', () => {
    expect(
      service.supplyQuotes('trova la locuzione poco simile a pro tempore')
    ).toBe('trova la locuzione poco simile a "pro tempore"');
  });
  //#endregion

  //#region lemma
  it('should convert lemma "cane" to [lemma="cane"]', () => {
    expect(service.convertQuery('lemma "cane"')).toBe('[lemma="cane"]');
  });
  it('should supply quotes in lemma cane', () => {
    expect(service.supplyQuotes('lemma cane')).toBe('lemma "cane"');
  });

  it('should convert trova il lemma "cane" to [lemma="cane"]', () => {
    expect(service.convertQuery('trova il lemma "cane"')).toBe(
      '[lemma="cane"]'
    );
  });
  it('should supply quotes in trova il lemma cane', () => {
    expect(service.supplyQuotes('trova il lemma cane')).toBe(
      'trova il lemma "cane"'
    );
  });

  // uguale a
  it('should convert trova il lemma uguale a "cane" to [lemma="cane"]', () => {
    expect(service.convertQuery('trova il lemma uguale a "cane"')).toBe(
      '[lemma="cane"]'
    );
  });
  it('should supply quotes in trova il lemma uguale a cane', () => {
    expect(service.supplyQuotes('trova il lemma uguale a cane')).toBe(
      'trova il lemma uguale a "cane"'
    );
  });

  // iniziante per
  it('should convert trova il lemma iniziante per "ca" to [lemma^="ca"]', () => {
    expect(service.convertQuery('trova il lemma iniziante per "ca"')).toBe(
      '[lemma^="ca"]'
    );
  });
  it('should supply quotes in trova il lemma iniziante per ca', () => {
    expect(service.supplyQuotes('trova il lemma iniziante per ca')).toBe(
      'trova il lemma iniziante per "ca"'
    );
  });

  // terminante per
  it('should convert trova il lemma terminante per "ne" to [lemma$="ne"]', () => {
    expect(service.convertQuery('trova il lemma terminante per "ne"')).toBe(
      '[lemma$="ne"]'
    );
  });
  it('should supply quotes in trova il lemma terminante per ne', () => {
    expect(service.supplyQuotes('trova il lemma terminante per ne')).toBe(
      'trova il lemma terminante per "ne"'
    );
  });

  // contenente
  it('should convert trova il lemma contenente "an" to [lemma*="an"]', () => {
    expect(service.convertQuery('trova il lemma contenente "an"')).toBe(
      '[lemma*="an"]'
    );
  });
  it('should supply quotes in trova il lemma contenente an', () => {
    expect(service.supplyQuotes('trova il lemma contenente an')).toBe(
      'trova il lemma contenente "an"'
    );
  });

  // corrispondente a
  it('should convert trova il lemma corrispondente a "c?n?" to [lemma?="c?n?"]', () => {
    expect(service.convertQuery('trova il lemma corrispondente a "c?n?"')).toBe(
      '[lemma?="c?n?"]'
    );
  });
  it('should supply quotes in trova il lemma corrispondente a c?n?', () => {
    expect(service.supplyQuotes('trova il lemma corrispondente a c?n?')).toBe(
      'trova il lemma corrispondente a "c?n?"'
    );
  });

  // simile a
  it('should convert trova il lemma simile a "cane" to [lemma%="cane:0.8"]', () => {
    expect(service.convertQuery('trova il lemma simile a "cane"')).toBe(
      '[lemma%="cane:0.8"]'
    );
  });
  it('should supply quotes in trova il lemma simile a cane', () => {
    expect(service.supplyQuotes('trova il lemma simile a cane')).toBe(
      'trova il lemma simile a "cane"'
    );
  });

  // molto simile a
  it('should convert trova il lemma molto simile a "cane" to [lemma%="cane:0.9"]', () => {
    expect(service.convertQuery('trova il lemma molto simile a "cane"')).toBe(
      '[lemma%="cane:0.9"]'
    );
  });
  it('should supply quotes in trova il lemma molto simile a cane', () => {
    expect(service.supplyQuotes('trova il lemma molto simile a cane')).toBe(
      'trova il lemma molto simile a "cane"'
    );
  });

  // poco simile a
  it('should convert trova il lemma poco simile a "cane" to [lemma%="cane:0.5"]', () => {
    expect(service.convertQuery('trova il lemma poco simile a "cane"')).toBe(
      '[lemma%="cane:0.5"]'
    );
  });
  it('should supply quotes in trova il lemma poco simile a cane', () => {
    expect(service.supplyQuotes('trova il lemma poco simile a cane')).toBe(
      'trova il lemma poco simile a "cane"'
    );
  });
  //#endregion

  //#region forestierismo
  it('should convert forestierismo "dog" to [language<>"ita"] AND [value="dog"]', () => {
    expect(service.convertQuery('forestierismo "dog"')).toBe(
      '[language<>"ita"] AND [value="dog"]'
    );
  });
  it('should supply quotes in forestierismo dog', () => {
    expect(service.supplyQuotes('forestierismo dog')).toBe(
      'forestierismo "dog"'
    );
  });

  it('should convert trova il forestierismo "dog" to [language<>"ita"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova il forestierismo "dog"')).toBe(
      '[language<>"ita"] AND [value="dog"]'
    );
  });
  it('should supply quotes in trova il forestierismo dog', () => {
    expect(service.supplyQuotes('trova il forestierismo dog')).toBe(
      'trova il forestierismo "dog"'
    );
  });

  // uguale a
  it('should convert trova il forestierismo uguale a "dog" to [language<>"ita"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova il forestierismo uguale a "dog"')).toBe(
      '[language<>"ita"] AND [value="dog"]'
    );
  });
  it('should supply quotes in trova il forestierismo uguale a dog', () => {
    expect(service.supplyQuotes('trova il forestierismo uguale a dog')).toBe(
      'trova il forestierismo uguale a "dog"'
    );
  });

  // iniziante per
  it('should convert trova il forestierismo iniziante per "do" to [language<>"ita"] AND [value^="do"]', () => {
    expect(
      service.convertQuery('trova il forestierismo iniziante per "do"')
    ).toBe('[language<>"ita"] AND [value^="do"]');
  });
  it('should supply quotes in trova il forestierismo iniziante per do', () => {
    expect(
      service.supplyQuotes('trova il forestierismo iniziante per do')
    ).toBe('trova il forestierismo iniziante per "do"');
  });

  // terminante per
  it('should convert trova il forestierismo terminante per "og" to [language<>"ita"] AND [value$="og"]', () => {
    expect(
      service.convertQuery('trova il forestierismo terminante per "og"')
    ).toBe('[language<>"ita"] AND [value$="og"]');
  });
  it('should supply quotes in trova il forestierismo terminante per og', () => {
    expect(
      service.supplyQuotes('trova il forestierismo terminante per og')
    ).toBe('trova il forestierismo terminante per "og"');
  });

  // contenente
  it('should convert trova il forestierismo contenente "og" to [language<>"ita"] AND [value*="og"]', () => {
    expect(service.convertQuery('trova il forestierismo contenente "og"')).toBe(
      '[language<>"ita"] AND [value*="og"]'
    );
  });
  it('should supply quotes in trova il forestierismo contenente og', () => {
    expect(service.supplyQuotes('trova il forestierismo contenente og')).toBe(
      'trova il forestierismo contenente "og"'
    );
  });

  // corrispondente a
  it('should convert trova il forestierismo corrispondente a "d?g" to [language<>"ita"] AND [value?="d?g"]', () => {
    expect(
      service.convertQuery('trova il forestierismo corrispondente a "d?g"')
    ).toBe('[language<>"ita"] AND [value?="d?g"]');
  });
  it('should supply quotes in trova il forestierismo corrispondente a d?g', () => {
    expect(
      service.supplyQuotes('trova il forestierismo corrispondente a d?g')
    ).toBe('trova il forestierismo corrispondente a "d?g"');
  });

  // simile a
  it('should convert trova il forestierismo simile a "dog" to [language<>"ita"] AND [value%="dog:0.8"]', () => {
    expect(service.convertQuery('trova il forestierismo simile a "dog"')).toBe(
      '[language<>"ita"] AND [value%="dog:0.8"]'
    );
  });
  it('should supply quotes in trova il forestierismo simile a dog', () => {
    expect(service.supplyQuotes('trova il forestierismo simile a dog')).toBe(
      'trova il forestierismo simile a "dog"'
    );
  });

  // molto simile a
  it('should convert trova il forestierismo molto simile a "dog" to [language<>"ita"] AND [value%="dog:0.9"]', () => {
    expect(
      service.convertQuery('trova il forestierismo molto simile a "dog"')
    ).toBe('[language<>"ita"] AND [value%="dog:0.9"]');
  });
  it('should supply quotes in trova il forestierismo molto simile a dog', () => {
    expect(
      service.supplyQuotes('trova il forestierismo molto simile a dog')
    ).toBe('trova il forestierismo molto simile a "dog"');
  });

  // poco simile a
  it('should convert trova il forestierismo poco simile a "dog" to [language<>"ita"] AND [value%="dog:0.5"]', () => {
    expect(
      service.convertQuery('trova il forestierismo poco simile a "dog"')
    ).toBe('[language<>"ita"] AND [value%="dog:0.5"]');
  });
  it('should supply quotes in trova il forestierismo poco simile a dog', () => {
    expect(
      service.supplyQuotes('trova il forestierismo poco simile a dog')
    ).toBe('trova il forestierismo poco simile a "dog"');
  });
  //#endregion

  //#region anglicismo
  it('should convert anglicismo "dog" to [language="eng"] AND [value="dog"]', () => {
    expect(service.convertQuery('anglicismo "dog"')).toBe(
      '[language="eng"] AND [value="dog"]'
    );
  });
  it('should supply quotes in anglicismo dog', () => {
    expect(service.supplyQuotes('anglicismo dog')).toBe('anglicismo "dog"');
  });

  it('should convert trova l\'anglicismo "dog" to [language="eng"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova l\'anglicismo "dog"')).toBe(
      '[language="eng"] AND [value="dog"]'
    );
  });
  it("should supply quotes in trova l'anglicismo dog", () => {
    expect(service.supplyQuotes("trova l'anglicismo dog")).toBe(
      'trova l\'anglicismo "dog"'
    );
  });

  // uguale a
  it('should convert trova l\'anglicismo uguale a "dog" to [language="eng"] AND [value="dog"]', () => {
    expect(service.convertQuery('trova l\'anglicismo uguale a "dog"')).toBe(
      '[language="eng"] AND [value="dog"]'
    );
  });
  it("should supply quotes in trova l'anglicismo uguale a dog", () => {
    expect(service.supplyQuotes("trova l'anglicismo uguale a dog")).toBe(
      'trova l\'anglicismo uguale a "dog"'
    );
  });

  // iniziante per
  it('should convert trova l\'anglicismo iniziante per "do" to [language="eng"] AND [value^="do"]', () => {
    expect(service.convertQuery('trova l\'anglicismo iniziante per "do"')).toBe(
      '[language="eng"] AND [value^="do"]'
    );
  });
  it("should supply quotes in trova l'anglicismo iniziante per do", () => {
    expect(service.supplyQuotes("trova l'anglicismo iniziante per do")).toBe(
      'trova l\'anglicismo iniziante per "do"'
    );
  });

  // terminante per
  it('should convert trova l\'anglicismo terminante per "og" to [language="eng"] AND [value$="og"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo terminante per "og"')
    ).toBe('[language="eng"] AND [value$="og"]');
  });
  it("should supply quotes in trova l'anglicismo terminante per og", () => {
    expect(service.supplyQuotes("trova l'anglicismo terminante per og")).toBe(
      'trova l\'anglicismo terminante per "og"'
    );
  });

  // contenente
  it('should convert trova l\'anglicismo contenente "og" to [language="eng"] AND [value*="og"]', () => {
    expect(service.convertQuery('trova l\'anglicismo contenente "og"')).toBe(
      '[language="eng"] AND [value*="og"]'
    );
  });
  it("should supply quotes in trova l'anglicismo contenente og", () => {
    expect(service.supplyQuotes("trova l'anglicismo contenente og")).toBe(
      'trova l\'anglicismo contenente "og"'
    );
  });

  // corrispondente a
  it('should convert trova l\'anglicismo corrispondente a "d?g" to [language="eng"] AND [value?="d?g"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo corrispondente a "d?g"')
    ).toBe('[language="eng"] AND [value?="d?g"]');
  });
  it("should supply quotes in trova l'anglicismo corrispondente a d?g", () => {
    expect(
      service.supplyQuotes("trova l'anglicismo corrispondente a d?g")
    ).toBe('trova l\'anglicismo corrispondente a "d?g"');
  });

  // simile a
  it('should convert trova l\'anglicismo simile a "dog" to [language="eng"] AND [value%="dog:0.8"]', () => {
    expect(service.convertQuery('trova l\'anglicismo simile a "dog"')).toBe(
      '[language="eng"] AND [value%="dog:0.8"]'
    );
  });
  it("should supply quotes in trova l'anglicismo simile a dog", () => {
    expect(service.supplyQuotes("trova l'anglicismo simile a dog")).toBe(
      'trova l\'anglicismo simile a "dog"'
    );
  });

  // molto simile a
  it('should convert trova l\'anglicismo molto simile a "dog" to [language="eng"] AND [value%="dog:0.9"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo molto simile a "dog"')
    ).toBe('[language="eng"] AND [value%="dog:0.9"]');
  });
  it("should supply quotes in trova l'anglicismo molto simile a dog", () => {
    expect(service.supplyQuotes("trova l'anglicismo molto simile a dog")).toBe(
      'trova l\'anglicismo molto simile a "dog"'
    );
  });

  // poco simile a
  it('should convert trova l\'anglicismo poco simile a "dog" to [language="eng"] AND [value%="dog:0.5"]', () => {
    expect(
      service.convertQuery('trova l\'anglicismo poco simile a "dog"')
    ).toBe('[language="eng"] AND [value%="dog:0.5"]');
  });
  it("should supply quotes in trova l'anglicismo poco simile a dog", () => {
    expect(service.supplyQuotes("trova l'anglicismo poco simile a dog")).toBe(
      'trova l\'anglicismo poco simile a "dog"'
    );
  });
  //#endregion

  //#region latinismo
  it('should convert latinismo "canis" to [language="lat"] AND [value="canis"]', () => {
    expect(service.convertQuery('latinismo "canis"')).toBe(
      '[language="lat"] AND [value="canis"]'
    );
  });
  it('should supply quotes in latinismo canis', () => {
    expect(service.supplyQuotes('latinismo canis')).toBe('latinismo "canis"');
  });

  it('should convert trova il latinismo "canis" to [language="lat"] AND [value="canis"]', () => {
    expect(service.convertQuery('trova il latinismo "canis"')).toBe(
      '[language="lat"] AND [value="canis"]'
    );
  });
  it('should supply quotes in trova il latinismo canis', () => {
    expect(service.supplyQuotes('trova il latinismo canis')).toBe(
      'trova il latinismo "canis"'
    );
  });

  // uguale a
  it('should convert trova il latinismo uguale a "canis" to [language="lat"] AND [value="canis"]', () => {
    expect(service.convertQuery('trova il latinismo uguale a "canis"')).toBe(
      '[language="lat"] AND [value="canis"]'
    );
  });
  it('should supply quotes in trova il latinismo uguale a canis', () => {
    expect(service.supplyQuotes('trova il latinismo uguale a canis')).toBe(
      'trova il latinismo uguale a "canis"'
    );
  });

  // iniziante per
  it('should convert trova il latinismo iniziante per "ca" to [language="lat"] AND [value^="ca"]', () => {
    expect(service.convertQuery('trova il latinismo iniziante per "ca"')).toBe(
      '[language="lat"] AND [value^="ca"]'
    );
  });
  it('should supply quotes in trova il latinismo iniziante per ca', () => {
    expect(service.supplyQuotes('trova il latinismo iniziante per ca')).toBe(
      'trova il latinismo iniziante per "ca"'
    );
  });

  // terminante per
  it('should convert trova il latinismo terminante per "is" to [language="lat"] AND [value$="is"]', () => {
    expect(service.convertQuery('trova il latinismo terminante per "is"')).toBe(
      '[language="lat"] AND [value$="is"]'
    );
  });
  it('should supply quotes in trova il latinismo terminante per is', () => {
    expect(service.supplyQuotes('trova il latinismo terminante per is')).toBe(
      'trova il latinismo terminante per "is"'
    );
  });

  // contenente
  it('should convert trova il latinismo contenente "an" to [language="lat"] AND [value*="an"]', () => {
    expect(service.convertQuery('trova il latinismo contenente "an"')).toBe(
      '[language="lat"] AND [value*="an"]'
    );
  });
  it('should supply quotes in trova il latinismo contenente an', () => {
    expect(service.supplyQuotes('trova il latinismo contenente an')).toBe(
      'trova il latinismo contenente "an"'
    );
  });

  // corrispondente a
  it('should convert trova il latinismo corrispondente a "c?n?" to [language="lat"] AND [value?="c?n?"]', () => {
    expect(
      service.convertQuery('trova il latinismo corrispondente a "c?n?"')
    ).toBe('[language="lat"] AND [value?="c?n?"]');
  });
  it('should supply quotes in trova il latinismo corrispondente a c?n?', () => {
    expect(
      service.supplyQuotes('trova il latinismo corrispondente a c?n?')
    ).toBe('trova il latinismo corrispondente a "c?n?"');
  });

  // simile a
  it('should convert trova il latinismo simile a "canis" to [language="lat"] AND [value%="canis:0.8"]', () => {
    expect(service.convertQuery('trova il latinismo simile a "canis"')).toBe(
      '[language="lat"] AND [value%="canis:0.8"]'
    );
  });
  it('should supply quotes in trova il latinismo simile a canis', () => {
    expect(service.supplyQuotes('trova il latinismo simile a canis')).toBe(
      'trova il latinismo simile a "canis"'
    );
  });

  // molto simile a
  it('should convert trova il latinismo molto simile a "canis" to [language="lat"] AND [value%="canis:0.9"]', () => {
    expect(
      service.convertQuery('trova il latinismo molto simile a "canis"')
    ).toBe('[language="lat"] AND [value%="canis:0.9"]');
  });
  it('should supply quotes in trova il latinismo molto simile a canis', () => {
    expect(
      service.supplyQuotes('trova il latinismo molto simile a canis')
    ).toBe('trova il latinismo molto simile a "canis"');
  });

  // poco simile a
  it('should convert trova il latinismo poco simile a "canis" to [language="lat"] AND [value%="canis:0.5"]', () => {
    expect(
      service.convertQuery('trova il latinismo poco simile a "canis"')
    ).toBe('[language="lat"] AND [value%="canis:0.5"]');
  });
  it('should supply quotes in trova il latinismo poco simile a canis', () => {
    expect(service.supplyQuotes('trova il latinismo poco simile a canis')).toBe(
      'trova il latinismo poco simile a "canis"'
    );
  });
  //#endregion

  //#region set: parole
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
    expect(service.convertQuery('tutte le parole come numero')).toBe(
      '[pos="NUM"]'
    );
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
    expect(service.convertQuery('tutte le parole come simbolo')).toBe(
      '[pos="SYM"]'
    );
  });

  it('should convert tutte le parole come verbo to [pos="VERB"]', () => {
    expect(service.convertQuery('tutte le parole come verbo')).toBe(
      '[pos="VERB"]'
    );
  });

  it('should convert tutte le parole come altro to [pos="X"]', () => {
    expect(service.convertQuery('tutte le parole come altro')).toBe(
      '[pos="X"]'
    );
  });

  // verbform: infinito gerundio participio
  it('should convert tutte le parole come infinito to [verbform="inf"]', () => {
    expect(service.convertQuery('tutte le parole come infinito')).toBe(
      '[verbform="inf"]'
    );
  });

  it('should convert tutte le parole come gerundio to [verbform="ger"]', () => {
    expect(service.convertQuery('tutte le parole come gerundio')).toBe(
      '[verbform="ger"]'
    );
  });

  it('should convert tutte le parole come participio to [verbform="part"]', () => {
    expect(service.convertQuery('tutte le parole come participio')).toBe(
      '[verbform="part"]'
    );
  });

  // mood: indicativo congiuntivo condizionale imperativo
  it('should convert tutte le parole come indicativo to [mood="ind"]', () => {
    expect(service.convertQuery('tutte le parole come indicativo')).toBe(
      '[mood="ind"]'
    );
  });

  it('should convert tutte le parole come congiuntivo to [mood="sub"]', () => {
    expect(service.convertQuery('tutte le parole come congiuntivo')).toBe(
      '[mood="sub"]'
    );
  });

  it('should convert tutte le parole come condizionale to [mood="cnd"]', () => {
    expect(service.convertQuery('tutte le parole come condizionale')).toBe(
      '[mood="cnd"]'
    );
  });

  it('should convert tutte le parole come imperativo to [mood="imp"]', () => {
    expect(service.convertQuery('tutte le parole come imperativo')).toBe(
      '[mood="imp"]'
    );
  });

  // tense: presente passato futuro
  it('should convert tutte le parole come presente to [tense="pres"]', () => {
    expect(service.convertQuery('tutte le parole come presente')).toBe(
      '[tense="pres"]'
    );
  });

  it('should convert tutte le parole come passato to [tense="past"]', () => {
    expect(service.convertQuery('tutte le parole come passato')).toBe(
      '[tense="past"]'
    );
  });

  it('should convert tutte le parole come futuro to [tense="fut"]', () => {
    expect(service.convertQuery('tutte le parole come futuro')).toBe(
      '[tense="fut"]'
    );
  });
  //#endregion

  //#region set: forestierismi
  it('should convert tutti i forestierismi to [language<>"ita"]', () => {
    expect(service.convertQuery('tutti i forestierismi')).toBe(
      '[language<>"ita"]'
    );
  });
  //#endregion

  //#region set: anglicismi
  it('should convert tutti gli anglicismi to [language="eng"]', () => {
    expect(service.convertQuery('tutti gli anglicismi')).toBe(
      '[language="eng"]'
    );
  });
  //#endregion

  //#region set: latinismi
  it('should convert tutti i latinismi to [language="lat"]', () => {
    expect(service.convertQuery('tutti i latinismi')).toBe('[language="lat"]');
  });

  it('should convert tutti i latinismi in grassetto to [language="lat"] AND [b="1"]', () => {
    expect(service.convertQuery('tutti i latinismi in grassetto')).toBe(
      '[language="lat"] AND [b="1"]'
    );
  });
  //#endregion

  //#region location
  // before
  it('should convert parola "cane" prima della parola "bello"', () => {
    expect(
      service.convertQuery('parola "cane" prima della parola "bello"')
    ).toBe('[value="cane"] BEFORE(m=3,s=snt) [value="bello"]');
  });
  it('should supply quotes in parola cane prima della parola bello', () => {
    expect(service.supplyQuotes('parola cane prima della parola bello')).toBe(
      'parola "cane" prima della parola "bello"'
    );
  });

  // after
  it('should convert parola "cane" dopo la parola "bel"', () => {
    expect(service.convertQuery('parola "cane" dopo la parola "bel"')).toBe(
      '[value="cane"] AFTER(m=3,s=snt) [value="bel"]'
    );
  });
  it('should supply quotes in parola cane dopo la parola bel', () => {
    expect(service.supplyQuotes('parola cane dopo la parola bel')).toBe(
      'parola "cane" dopo la parola "bel"'
    );
  });

  // a inizio di frase
  it('should convert parola "cane" a inizio di frase', () => {
    expect(
      service.convertQuery("parola \"cane\" a inizio di frase")
    ).toBe('[value="cane"] LALIGN(m=0) [$name="snt"]');
  });

  // a fine di frase
  it('should convert parola "cane" a fine di frase', () => {
    expect(service.convertQuery('parola "cane" a fine di frase')).toBe(
      '[value="cane"] RALIGN(m=0) [$name="snt"]'
    );
  });

  // non a inizio di frase
  it('should convert parola "cane" non a inizio di frase', () => {
    expect(service.convertQuery('parola "cane" non a inizio di frase')).toBe(
      '[value="cane"] NOT LALIGN(m=0) [$name="snt"]'
    );
  });

  // non a fine di frase
  it('should convert parola "cane" non a fine di frase', () => {
    expect(service.convertQuery('parola "cane" non a fine di frase')).toBe(
      '[value="cane"] NOT RALIGN(m=0) [$name="snt"]'
    );
  });

  // non vicino a
  it('should convert parola "cane" non vicino alla parola "bello"', () => {
    expect(
      service.convertQuery('parola "cane" non vicino alla parola "bello"')
    ).toBe('[value="cane"] NOT NEAR(m=3,s=snt) [value="bello"]');
  });
  //#endregion

  //#region style
  it('should convert tutti i latinismi in sottolineato to [language="lat"] AND [u="1"]', () => {
    expect(service.convertQuery('tutti i latinismi in sottolineato')).toBe(
      '[language="lat"] AND [u="1"]'
    );
  });
  //#endregion

  //#region normalization
  it('should convert an empty text to an empty query', () => {
    expect(service.convertQuery('')).toBe('');
  });

  it('should lowercase the text and strip its diacritics', () => {
    expect(service.convertQuery('Città')).toBe('[value="citta"]');
  });

  it('should convert no text to no segments', () => {
    expect(service.convertToSegments(undefined)).toBe('');
    expect(service.convertToSegments('')).toBe('');
  });

  it('should strip diacritics preserving case when converting to segments', () => {
    expect(service.convertToSegments('Perché È così')).toBe('Perche E cosi');
  });

  it('should preserve characters out of the Latin range when converting to segments', () => {
    expect(service.convertToSegments('λόγος è')).toBe('λόγος e');
  });
  //#endregion
});
