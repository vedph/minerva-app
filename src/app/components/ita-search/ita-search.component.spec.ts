import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ItaSearchComponent } from './ita-search.component';
import { SPEECH_RECOGNITION_LANG } from '../../services/speech-recognition.service';

describe('ItaSearchComponent', () => {
  let component: ItaSearchComponent;
  let fixture: ComponentFixture<ItaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItaSearchComponent],
      providers: [
        provideHttpClient(),
        {
          provide: SPEECH_RECOGNITION_LANG,
          useValue: 'it-IT',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
