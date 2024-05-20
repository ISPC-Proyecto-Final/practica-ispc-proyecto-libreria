import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SearchService } from 'src/app/services/search/search.service';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  title = '';

  constructor(
    private navigationService: NavigationService,
    private bookService: BookService
  ) { }

  onClickSearch() {
    this.bookService.getSearchResults(this.title);
    this.navigationService.navigateToSearchBook();
  }
}
