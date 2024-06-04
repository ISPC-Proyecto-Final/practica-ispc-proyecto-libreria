import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToBack() {
    this.location.back();
  }

  navigateToBookDetail(id: number) {
    this.router.navigate(['/book-detail', id]);
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

  navigateToCatalogue() {
    this.router.navigate(['catalogue']);
  }

  navigateToCartDetail() {
    this.router.navigate(['cart-detail']);
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  navigateToSearchBook() {
    this.router.navigate(['book-search']);
  }

  navigateToMobilePage() {
    this.router.navigate(['mobile-app']);
  }

  navigateToSubscription() {
    this.router.navigate(['subscription']);
  }
  navigateToContact() {
    this.router.navigate(['contact']);
  }
}
