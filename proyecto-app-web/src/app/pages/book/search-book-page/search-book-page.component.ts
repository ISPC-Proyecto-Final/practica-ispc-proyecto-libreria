import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book/book-model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-search-book-page',
  templateUrl: './search-book-page.component.html',
  styleUrls: ['./search-book-page.component.css']
})
export class SearchBookPageComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  title: string = '';
  searchSub!: Subscription;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getSearchBooks();
  }

  ngOnDestroy(): void {
    this.bookService.clearSearchResults();
    this.searchSub.unsubscribe();
  }

  getSearchBooks() {
    this.searchSub = this.bookService.getBookSearchListener()
      .subscribe((result: Book[]) => {
        this.books = result;
      });

  }
}
