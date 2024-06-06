import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDashboardPageComponent } from './coupon-dashboard-page.component';

describe('CouponDashboardPageComponent', () => {
  let component: CouponDashboardPageComponent;
  let fixture: ComponentFixture<CouponDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
