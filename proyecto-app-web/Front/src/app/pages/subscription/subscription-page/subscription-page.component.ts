import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent {

  constructor(private navitaionService: NavigationService) { }

  onClickSubscription(){
    this.navitaionService.navigateToCheckout();
  }

}
