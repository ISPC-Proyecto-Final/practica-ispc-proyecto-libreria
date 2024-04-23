import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { BookDetailComponent } from "./book/book-detail-page/book-detail.component";
import { BookDashboardPageComponent } from "../admin/pages/book-dashboard-page/book-dashboard-page.component";
import { CheckoutPageComponent } from "./checkout/checkout-page/checkout-page.component";
import { BookCataloguePageComponent } from "./book/book-catalogue-page/catalogue-page.component";
import { CartDetailPageComponent } from "./cart/cart-detail-page/cart-detail-page.component";
import { AccountDetailsComponent } from "./account/account-details/account-details.component";
import { SearchBookPageComponent } from "./book/search-book-page/search-book-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'book-detail/:id', component: BookDetailComponent },
  { path: 'book-detail', component: BookDetailComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'catalogue', component: BookCataloguePageComponent },
  { path: 'cart-detail', component: CartDetailPageComponent },
  { path: 'profile', component: AccountDetailsComponent },
  { path: 'book-search', component: SearchBookPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
