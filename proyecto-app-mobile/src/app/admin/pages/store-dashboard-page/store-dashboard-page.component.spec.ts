import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDashboardPageComponent } from './store-dashboard-page.component';

describe('StoreDashboardPageComponent', () => {
  let component: StoreDashboardPageComponent;
  let fixture: ComponentFixture<StoreDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
