import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-selected-book-not-found',
  templateUrl: './selected-book-not-found.component.html',
  styleUrls: ['./selected-book-not-found.component.css']
})
export class SelectedBookNotFoundComponent {

  constructor(
    private navigationService: NavigationService
  ) { }

  goToCatalogue() {
    this.navigationService.navigateToCatalogue();
  }
}
