import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-search-book-not-found',
  templateUrl: './search-book-not-found.component.html',
  styleUrls: ['./search-book-not-found.component.css']
})
export class SearchBookNotFoundComponent implements OnInit, OnDestroy {

  title: string = '';
  message: string = '';
  titleSub!: Subscription;

  constructor(
    private navigationService: NavigationService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getSearchTitle();
  }

  ngOnDestroy(): void {
    this.titleSub.unsubscribe();
  }

  goToCatalogue() {
    this.navigationService.navigateToCatalogue();
  }

  getSearchTitle() {
    this.titleSub = this.bookService.searchTitleListener()
      .subscribe((result: string) => {
        this.title = result;
      });
  }

}
