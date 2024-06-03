import { TestBed } from '@angular/core/testing';

import { SaleDashboardService } from './sale-dashboard.service';

describe('SaleDashboardService', () => {
  let service: SaleDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
