import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeatherComponent } from './edit-weather.component';

describe('EditWeatherComponent', () => {
  let component: EditWeatherComponent;
  let fixture: ComponentFixture<EditWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWeatherComponent]
    });
    fixture = TestBed.createComponent(EditWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
