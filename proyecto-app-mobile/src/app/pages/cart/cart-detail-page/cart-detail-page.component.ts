import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectedBookDto } from 'src/app/models/book/book-model';
import { CartService } from 'src/app/services/cart/cart.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-cart-detail-page',
  templateUrl: './cart-detail-page.component.html',
  styleUrls: ['./cart-detail-page.component.css'],
})
export class CartDetailPageComponent implements OnInit, OnDestroy {
  cartSub!: Subscription;
  totalItemSub!: Subscription;
  totalCostSub!: Subscription;
  books: SelectedBookDto[] = [];
  totalItems: number = 0;
  totalCost: number = 0;
  coupon: string = '';
  couponErrorMessage: string = '';
  couponSuccessMessage: string = '';

  constructor(
    private navigationService: NavigationService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartSubscribe();
    this.totalItemSubscribe();
    this.totalCostSubscribe();
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.totalItemSub.unsubscribe();
    this.totalCostSub.unsubscribe();
  }

  cartSubscribe() {
    this.cartSub = this.cartService
      .getcartUpdatedListener()
      .subscribe((books: SelectedBookDto[]) => {
        this.books = books;
      });
  }

  totalItemSubscribe() {
    this.totalItemSub = this.cartService
      .getTotalItemsListener()
      .subscribe((totalItems: number) => {
        this.totalItems = totalItems;
      });
  }

  totalCostSubscribe() {
    this.totalCostSub = this.cartService
      .getTotalCostListener()
      .subscribe((totalCost: number) => {
        this.totalCost = totalCost;
      });
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onClickConfirmPurchase() {
    // if (!this.books.length) {
    //   return;
    // }
    this.navigationService.navigateToCheckout();
  }

  onSubmitCoupon() {
    this.couponErrorMessage= '';
    this.couponSuccessMessage = '';
    this.cartService.makeDiscount(0);
    const keyword = this.coupon.slice(0, 6);
    this.coupon = this.coupon.replace(/[^\d.-]/g, "");
    const discountPercent = parseFloat(this.coupon);
    this.coupon = `${keyword}${this.coupon}`;
    if (keyword.toLocaleLowerCase() !== 'pluton') {
      console.log('no es pluton');
      this.couponErrorMessage= 'Cupón inválido';
      return;
    }

    if(Number.isNaN(discountPercent)){
      console.log('no es un numero');
      this.couponErrorMessage= 'Cupón inválido';
      return;
    }

    this.cartService.makeDiscount(discountPercent);
    this.couponSuccessMessage = 'Cupón aplicado exitosamente'
  }
}
