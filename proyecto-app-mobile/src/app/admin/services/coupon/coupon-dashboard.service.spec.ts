import { TestBed } from '@angular/core/testing';

import { CouponDashboardService } from './coupon-dashboard.service';

describe('CouponDashboardService', () => {
  let service: CouponDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
