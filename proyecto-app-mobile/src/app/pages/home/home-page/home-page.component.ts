import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book-model';
import { BookService } from 'src/app/services/book/book.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { TAG } from 'src/app/utils/enums/book.enum';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  bookService: BookService;
  newAtBooks: Book[] = [];
  recomendedBooks: Book[] = [];
  topSellingBooks: Book[] = [];

  constructor(
    bookService: BookService,
    private navigationService: NavigationService,
  ) {
    this.bookService = bookService;
  }

  ngOnInit() {
    this.getRecomendedBooks();
    this.getNewAtBooks();
    this.getTopSellerBooks();
  }

  onClickCatalogue() {
    this.navigationService.navigateToCatalogue();
  }

  getRecomendedBooks() {
    this.bookService.getBooksByTag(TAG.RECOMENDADOS)
      .subscribe((result: Book[]) => {
        this.recomendedBooks = this.sortAndLimit(result);
      })
  }

  getNewAtBooks() {
    this.bookService.getBooksByTag(TAG.NOVEDADES)
      .subscribe((result: Book[]) => {
        this.newAtBooks = this.sortAndLimit(result);
      })
  }

  getTopSellerBooks() {
    this.bookService.getBooksByTag(TAG.TOP_VENDIDOS)
      .subscribe((result: Book[]) => {
        this.topSellingBooks = this.sortAndLimit(result);
      })
  }

  sortAndLimit(books: Book[]) {
    return books.sort(() => Math.random() - 0.5).slice(0, 2);
  }

}






