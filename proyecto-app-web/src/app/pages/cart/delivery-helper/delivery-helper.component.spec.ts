import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryHelperComponent } from './delivery-helper.component';

describe('DeliveryHelperComponent', () => {
  let component: DeliveryHelperComponent;
  let fixture: ComponentFixture<DeliveryHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryHelperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
