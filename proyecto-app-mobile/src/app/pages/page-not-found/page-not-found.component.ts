import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(
    private navigationService: NavigationService
  ) { }

  goToHome() {
    this.navigationService.navigateToHome();
  }

}
