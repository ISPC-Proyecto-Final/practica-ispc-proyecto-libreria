import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksRowCardsComponent } from './books-row-cards.component';

describe('BooksRowCardsComponent', () => {
  let component: BooksRowCardsComponent;
  let fixture: ComponentFixture<BooksRowCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksRowCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksRowCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
