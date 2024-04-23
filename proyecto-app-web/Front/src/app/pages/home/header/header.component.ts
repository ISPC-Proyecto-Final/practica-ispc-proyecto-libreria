import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private navitaionService: NavigationService) { }

  onClickCatalogue() {
    this.navitaionService.navigateToCatalogue();
  }

}
