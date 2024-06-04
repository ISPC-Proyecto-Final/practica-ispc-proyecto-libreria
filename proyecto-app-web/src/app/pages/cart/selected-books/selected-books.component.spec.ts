import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBooksComponent } from './selected-books.component';

describe('SelectedBooksComponent', () => {
  let component: SelectedBooksComponent;
  let fixture: ComponentFixture<SelectedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
