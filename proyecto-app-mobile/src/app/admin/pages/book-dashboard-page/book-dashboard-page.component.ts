import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book-model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookFormComponent } from './book-form/book-form.component';
import { BookDashboardService } from '../../services/book/book-dashboard.service';
import { ToastService } from 'src/app/services/utils/toast.service';


@Component({
  selector: 'app-book-dashboard-page',
  templateUrl: './book-dashboard-page.component.html',
  styleUrls: ['./book-dashboard-page.component.css']
})
export class BookDashboardPageComponent implements OnInit {

  books: Book[] = [];
  title = '';

  constructor(
    private bookService: BookDashboardService,
    private modalService: NgbModal,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getAllBooks()
      .subscribe((result: Book[]) => {
        this.books = this.bookService.oderBooksByAuthorNameAsc(result);
      });
  }

  onCreateBook() {
    const modalRef = this.modalService.open(BookFormComponent, { size: 'lg', centered: true })
      .result.then((result: boolean) => {
        console.log('res', result);
        if (!result) {
          return;
        }
        this.getBooks();
      }, () => {
        return;
      });
  }

  onEditBook(id: number) {
    const modalRef = this.modalService.open(BookFormComponent, { size: 'lg', centered: true })
    modalRef.componentInstance.action = 'edit';
    modalRef.componentInstance.bookId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getBooks();
    }, () => {
      return;
    });
  }

  onDeleteBook(id: number) {
    const modalRef = this.modalService.open(BookFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'delete';
    modalRef.componentInstance.bookId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getBooks();
    }, () => {
      return;
    });
  }

  onViewBook(id: number) {
    const modalRef = this.modalService.open(BookFormComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.action = 'view';
    modalRef.componentInstance.bookId = id;
  }

  onClickSearch(){

  }

  showSubscriptionBooks(){
    this.bookService.getAllBooks()
    .subscribe((result: Book[]) => {
      this.books = result.filter(book => book.subscription);
    });
  }
}

