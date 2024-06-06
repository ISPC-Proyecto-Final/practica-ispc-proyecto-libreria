import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectedBookDto } from 'src/app/models/book/book-model';
import { Coupon } from 'src/app/models/coupon/coupon-model';
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
    if (!this.books.length) {
      return;
    }
    this.navigationService.navigateToCheckout();
  }

  onSubmitCoupon() {
    this.cartService.getAllCoupons()
      .subscribe((result: Coupon[]) => {
        const coupons = result;
        const matchCoupon = coupons.find(item => item.name.toLocaleLowerCase().trim() === this.coupon.toLocaleLowerCase().trim());
        const discount = matchCoupon?.discount ? matchCoupon.discount : 0;
        this.couponErrorMessage = !discount ? 'Cupón inválido' : '';
        this.couponSuccessMessage = discount ? 'Cupón aplicado exitosamente' : '';
        this.cartService.makeDiscount(discount);
      });
  }
}
