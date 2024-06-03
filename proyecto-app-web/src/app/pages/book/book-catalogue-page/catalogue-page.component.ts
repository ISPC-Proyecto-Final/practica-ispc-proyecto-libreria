import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book/book-model';
import { BookService } from 'src/app/services/book/book.service';
import { GENRE } from 'src/app/utils/enums/book.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css'],
})
export class BookCataloguePageComponent implements OnInit, OnDestroy {
  bookService: BookService;
  books: Book[] = [];
  genre = GENRE;
  selectedGenre: number = 0;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  ngOnInit() {
    this.getAllBooks();
  }

  ngOnDestroy() {
    this.bookService.clearSearchResults();
  }

  getAllBooks() {
    this.selectedGenre = 0;
    this.bookService.getAllBooks().subscribe((result: Book[]) => {
      this.books = this.bookService.oderBooksByAuthorNameAsc(result);
    });
  }

  onBookGenre(genre: GENRE) {
    this.selectedGenre = genre;
    this.bookService.getBooksByGenre(genre).subscribe((result: Book[]) => {
      this.books = result;
    });
  }

  isActive(navGenre: number) {
    return this.selectedGenre === navGenre;
  }
}
