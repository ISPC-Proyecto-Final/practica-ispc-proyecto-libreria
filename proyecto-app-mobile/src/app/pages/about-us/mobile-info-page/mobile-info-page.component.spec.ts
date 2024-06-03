import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInfoPageComponent } from './mobile-info-page.component';

describe('MobileInfoPageComponent', () => {
  let component: MobileInfoPageComponent;
  let fixture: ComponentFixture<MobileInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
