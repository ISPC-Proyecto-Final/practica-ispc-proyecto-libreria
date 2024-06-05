import { Component, Input } from '@angular/core';
import { Book, SelectedBookDto } from 'src/app/models/book/book-model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastService } from 'src/app/services/utils/toast.service';

@Component({
  selector: 'app-selected-book-detail',
  templateUrl: './selected-book-detail.component.html',
  styleUrls: ['./selected-book-detail.component.css']
})
export class SelectedBookDetailComponent {

  @Input() book!: SelectedBookDto;

  constructor(
    private CartService: CartService,
    private toastService: ToastService,
  ) { }

  onAddBook() {
    this.CartService.addBook(this.book);
  }

  onRemoveCopy() {
    this.CartService.removeCopy(this.book.isbn);
  }

  onRemoveBook() {
    this.toastService.createToast({type: 'bg-success', delay: 2500, message: 'Eliminaste libro del carrito'});
    this.CartService.removeBook(this.book.isbn);
  }

}
