import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItaSearchComponent } from './ita-search.component';

describe('ItaSearchComponent', () => {
  let component: ItaSearchComponent;
  let fixture: ComponentFixture<ItaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItaSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
