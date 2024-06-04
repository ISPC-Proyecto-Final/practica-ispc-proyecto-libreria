import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBookDetailComponent } from './selected-book-detail.component';

describe('SelectedBookDetailComponent', () => {
  let component: SelectedBookDetailComponent;
  let fixture: ComponentFixture<SelectedBookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedBookDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedBookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
