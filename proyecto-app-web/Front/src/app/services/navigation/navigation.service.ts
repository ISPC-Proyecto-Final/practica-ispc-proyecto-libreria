import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  navigateToHome() {
    this.router.navigate(['/home']);
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
}
