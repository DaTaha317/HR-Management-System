import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficalDaysComponent } from './offical-days.component';

describe('OfficalDaysComponent', () => {
  let component: OfficalDaysComponent;
  let fixture: ComponentFixture<OfficalDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficalDaysComponent]
    });
    fixture = TestBed.createComponent(OfficalDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
