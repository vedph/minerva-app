import { TestBed } from '@angular/core/testing';

import { I18nPaginatorIntlService } from './i18n-paginator-intl.service';

describe('I18nPaginatorIntlService', () => {
  let service: I18nPaginatorIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [I18nPaginatorIntlService] });
    service = TestBed.inject(I18nPaginatorIntlService);
  });

  it('should provide the paginator labels', () => {
    expect(service.firstPageLabel).toBe('First page');
    expect(service.itemsPerPageLabel).toBe('Items per page:');
    expect(service.lastPageLabel).toBe('Last page');
    expect(service.nextPageLabel).toBe('Next page');
    expect(service.previousPageLabel).toBe('Previous page');
  });

  it('should get a single page range label when there are no items', () => {
    expect(service.getRangeLabel(0, 10, 0)).toBe('Page 1 of 1');
  });

  it('should get the range label for the first page', () => {
    expect(service.getRangeLabel(0, 10, 95)).toBe('Page 1 of 10');
  });

  it('should get the range label for an inner page', () => {
    expect(service.getRangeLabel(4, 20, 200)).toBe('Page 5 of 10');
  });

  it('should count a partially filled last page', () => {
    expect(service.getRangeLabel(2, 10, 21)).toBe('Page 3 of 3');
  });
});
