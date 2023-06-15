import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNGComponent } from './prime-ng.component';

describe('PrimeNGComponent', () => {
  let component: PrimeNGComponent;
  let fixture: ComponentFixture<PrimeNGComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeNGComponent]
    });
    fixture = TestBed.createComponent(PrimeNGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
