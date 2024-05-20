import { TestBed } from '@angular/core/testing';

import { PublisherDashboardService } from './publisher-dashboard.service';

describe('PublisherDashboardService', () => {
  let service: PublisherDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
