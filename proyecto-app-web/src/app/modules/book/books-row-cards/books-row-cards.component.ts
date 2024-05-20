import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book-model';

@Component({
  selector: 'app-books-row-cards',
  templateUrl: './books-row-cards.component.html',
  styleUrls: ['./books-row-cards.component.css'],
})
export class BooksRowCardsComponent implements OnInit {

  @Input() books: Book[] = [];
  @Input() showPrice = true;
  @Input() justify: 'evenly' | 'center' | 'start' = 'start';

  ngOnInit(): void {

  }
}
