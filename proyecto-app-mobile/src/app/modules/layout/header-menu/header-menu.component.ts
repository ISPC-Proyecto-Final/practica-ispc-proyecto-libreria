import { Component, Input } from '@angular/core';
import { AdminNavigationService } from 'src/app/admin/services/navigation/navigation.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {

  @Input() isAdmin = false;

  constructor(
    private navigationService: NavigationService,
    private adminNavigationService: AdminNavigationService
  ) { }

  onClickNavigateToHome() {
    if (this.isAdmin) {
      this.adminNavigationService.navigateToAdminHomePage();
      return;
    }

    this.navigationService.navigateToHome();
  }

}
