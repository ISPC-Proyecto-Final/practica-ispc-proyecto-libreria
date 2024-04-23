import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectedBooksComponent } from './selected-books/selected-books.component';
import { SelectedBookDetailComponent } from './selected-book-detail/selected-book-detail.component';
import { CartDetailPageComponent } from './cart-detail-page/cart-detail-page.component';
import { DeliveryHelperComponent } from './delivery-helper/delivery-helper.component';
import { StoreHelperComponent } from './store-helper/store-helper/store-helper.component';

@NgModule({
  declarations: [
    SelectedBookDetailComponent,
    SelectedBooksComponent,
    CartDetailPageComponent,
    DeliveryHelperComponent,
    StoreHelperComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class CartModule {}
