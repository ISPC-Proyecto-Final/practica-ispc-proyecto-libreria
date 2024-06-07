import { Component } from '@angular/core';
import { SelectedBookDto } from 'src/app/models/book/book-model';
import { CartService } from 'src/app/services/cart/cart.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ToastService } from 'src/app/services/utils/toast.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent {

  constructor(
    private navitaionService: NavigationService,
    private toastService: ToastService,
    private cartService: CartService,
  ) { }

  onClickSubscription(){
    let selectedBook: SelectedBookDto = {
      id_book: -1,
      isbn: '',
      title: 'Suscripción mensual',
      author: {id_author: -1, name: 'Plutón'},
      book_cover: '',
      price: '15000',
      selectedAmount: 0,
    };
    this.toastService.createToast({type: 'bg-success', delay: 4000, message: 'Agregaste la suscripción al carrito'});
    this.cartService.addBook(selectedBook);
  }
}
