import { Component, Input } from '@angular/core';
import { Subscription } from "rxjs";

import { SelectedBookDto } from 'src/app/models/book/book-model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-selected-books',
  templateUrl: './selected-books.component.html',
  styleUrls: ['./selected-books.component.css']
})
export class SelectedBooksComponent {

  @Input() books: SelectedBookDto[] = [];

}
