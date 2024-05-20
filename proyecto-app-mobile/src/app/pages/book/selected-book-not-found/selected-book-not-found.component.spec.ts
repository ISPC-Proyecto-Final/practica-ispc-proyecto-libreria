import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBookNotFoundComponent } from './selected-book-not-found.component';

describe('SelectedBookNotFoundComponent', () => {
  let component: SelectedBookNotFoundComponent;
  let fixture: ComponentFixture<SelectedBookNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedBookNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedBookNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
