import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqitaComponent } from './pqita.component';

describe('PqitaComponent', () => {
  let component: PqitaComponent;
  let fixture: ComponentFixture<PqitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
