import { Component, Input } from '@angular/core';
import { Book, SelectedBookDto } from 'src/app/models/book/book-model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-selected-book-detail',
  templateUrl: './selected-book-detail.component.html',
  styleUrls: ['./selected-book-detail.component.css']
})
export class SelectedBookDetailComponent {

  @Input() book!: SelectedBookDto;

  constructor(private CartService: CartService) { }

  onAddBook() {
    this.CartService.addBook(this.book);
  }

  onRemoveCopy() {
    this.CartService.removeCopy(this.book.isbn);
  }

  onRemoveBook() {
    this.CartService.removeBook(this.book.isbn);
  }

}
