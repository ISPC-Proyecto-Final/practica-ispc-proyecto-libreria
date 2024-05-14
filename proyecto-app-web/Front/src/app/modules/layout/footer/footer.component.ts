import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private navigationService: NavigationService) { }

  onClickHome() {
    this.navigationService.navigateToHome();
  }

  onClickCartDetail() {
    this.navigationService.navigateToCartDetail();
  }

  onClickCatalogue() {
    this.navigationService.navigateToCatalogue();
  }

  onClickMyAccount() {
    this.navigationService.navigateToProfile();
  }

  onClickMobileAppAdd(){
    this.navigationService.navigateToMobilePage();
  }
  onClickSubscription(){
    this.navigationService.navigateToSubscription();
  }
}
