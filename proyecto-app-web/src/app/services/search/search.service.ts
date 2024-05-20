import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book/book-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private books: Book[] = [];
  private bookUpdated = new BehaviorSubject<Book[]>([]);

  constructor() {}

  removeBook(bookId: number) {}

  getSearchResults(title: string): void {
    this.books = this.books.filter((book) => book.title.includes(title));
    this.bookUpdated.next([...this.books]);
  }

  getSearchBookListener() {
    return this.bookUpdated.asObservable();
  }
}
