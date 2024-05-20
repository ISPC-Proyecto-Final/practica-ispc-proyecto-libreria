import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { BooksRowCardsComponent } from './books-row-cards/books-row-cards.component';



@NgModule({
  declarations: [
    BookCardComponent,
    BooksRowCardsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BooksRowCardsComponent]
})
export class BookCardModule { }
