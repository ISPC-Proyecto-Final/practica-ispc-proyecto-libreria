import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-button-cart',
  templateUrl: './button-cart.component.html',
  styleUrls: ['./button-cart.component.css']
})
export class ButtonCartComponent implements OnInit {

  totalItemSub!: Subscription;
  totalItems: number = 0;

  constructor(
    private navigationService: NavigationService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.totalItemSubscribe();
  }

  totalItemSubscribe() {
    this.totalItemSub = this.cartService.getTotalItemsListener().
      subscribe((totalItems: number) => {
        this.totalItems = totalItems;
      });
  }

  onClickCartButton() {
    this.navigationService.navigateToCartDetail();
  }
}
