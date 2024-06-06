import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AdminNavigationService {
  constructor(private router: Router) { }

  navigateToAdminHomePage() {
    this.router.navigate(['/admin']);
  }

  navigateToBookDashboard() {
    this.router.navigate(['/admin/book-dashboard']);
  }

  navigateToSalesDashboard() {
    this.router.navigate(['/admin/sales-dashboard']);
  }

  navigateToClientDashboard() {
    this.router.navigate(['/admin/client-dashboard']);
  }

  navigateToStoreDashboard() {
    this.router.navigate(['/admin/store-dashboard']);
  }

  navigateToAuthorDashboard() {
    this.router.navigate(['/admin/author-dashboard']);
  }

  navigateToPublisherDashboard() {
    this.router.navigate(['/admin/publisher-dashboard']);
  }

  navigateToCouponDashboard() {
    this.router.navigate(['/admin/coupons']);
  }
}
