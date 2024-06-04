import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from '../../login/login-page/login-page.component';
import { RegisterPageComponent } from '../../login/register-page/register-page.component';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { AdminNavigationService } from 'src/app/admin/services/navigation/navigation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/models/auth/auth-model';
import { User } from 'src/app/models/user/user-model';
import { Credentials } from 'src/app/models/credentials/credentials-model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profile: User | null = null;
  @Input() isAdmin = false;

  constructor(
    private modalService: NgbModal,
    private navigationService: NavigationService,
    private adminNavigationService: AdminNavigationService,
    private authService: AuthService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  onClickBack() {
    this.navigationService.navigateToBack();
  }

  onClickNavigateToHome() {
    this.navigationService.navigateToHome();
  }

  onClickNavigateToCatalogue() {
    this.navigationService.navigateToCatalogue();
  }

  onClickNavigateToSubscription() {
    this.navigationService.navigateToSubscription();
  }
  onClickNavigateToContact() {
    this.navigationService.navigateToContact();
  }

  onClickNavigateToBookDashboard() {
    this.adminNavigationService.navigateToBookDashboard();
  }

  onClickNavigateToSalesDashboard() {
    this.adminNavigationService.navigateToSalesDashboard();
  }

  navigateToStoreDashboard() {
    this.adminNavigationService.navigateToStoreDashboard();
  }

  onClickNavigateToClientDashboard() {
    this.adminNavigationService.navigateToClientDashboard();
  }

  onClickNavigateToAuthorDashboard() {
    this.adminNavigationService.navigateToAuthorDashboard();
  }
  onClickNavigateToPublisherDashboard() {
    this.adminNavigationService.navigateToPublisherDashboard();
  }


  getProfile() {
    this.authService.getProfileListener().subscribe((user) => {
      this.profile = user;
    });
  }

  onProfile() {
    this.navigationService.navigateToProfile();
  }

  onLogout() {
    //TODO LOGOUT
    this.navigationService.navigateToHome();
  }

  logout() {
    this.authService.logoutUser().subscribe((response: boolean) => {
      if (!response) {
        return;
      }
      this.authService.clearProfile();
      this.cartService.clearCart();
      this.navigationService.navigateToHome();
    });
  }
}
