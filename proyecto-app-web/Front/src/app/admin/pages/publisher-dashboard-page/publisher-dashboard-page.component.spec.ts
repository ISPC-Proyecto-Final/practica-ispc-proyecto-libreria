import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherDashboardPageComponent } from './publisher-dashboard-page.component';

describe('PublisherDashboardPageComponent', () => {
  let component: PublisherDashboardPageComponent;
  let fixture: ComponentFixture<PublisherDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
