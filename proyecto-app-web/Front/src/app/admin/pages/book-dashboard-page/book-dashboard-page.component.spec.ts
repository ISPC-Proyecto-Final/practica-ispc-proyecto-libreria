import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDashboardPageComponent } from './book-dashboard-page.component';

describe('BookDashboardPageComponent', () => {
  let component: BookDashboardPageComponent;
  let fixture: ComponentFixture<BookDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
