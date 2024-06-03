import { TestBed } from '@angular/core/testing';

import { GenreDashboardService } from './genre-dashboard.service';

describe('GenreService', () => {
  let service: GenreDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
