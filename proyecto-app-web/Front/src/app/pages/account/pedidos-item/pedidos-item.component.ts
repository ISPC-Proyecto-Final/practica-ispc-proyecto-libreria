import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book/book-model';
import { Sale } from 'src/app/models/sale/sale-model';
import { Purchase } from 'src/app/models/user/purchase-model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-pedidos-item',
  templateUrl: './pedidos-item.component.html',
  styleUrls: ['./pedidos-item.component.css']
})
export class PedidosItemComponent implements OnInit, OnDestroy {
  @Input()
  purchases!: Sale[];

  bookSub!: Subscription;
  books: Book[] = []

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.bookSub.unsubscribe();
  }

  getBooks() {
    this.bookSub = this.bookService.getAllBooks()
      .subscribe((result: Book[]) => {
        this.books = result;
      })
  }


  getBookTitle(id: number) {
    let bookTitle = ''
    this.books.forEach(book => {
      if (book.id_book === id) {
        bookTitle = book.title;
      }
    });
    return bookTitle;
  }

  getBookPrice(id: number) {
    let bookPrice = ''
    this.books.forEach(book => {
      if (book.id_book === id) {
        bookPrice = book.price;
      }
    });
    return bookPrice;
  }
}
