import { Injectable } from '@angular/core';
// import { allBooks } from './book-simulation-data';
// import { selectedBooks } from './book-simulation-data';
import { TAG } from 'src/app/utils/enums/book.enum';
import { Book } from 'src/app/models/book/book-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Genre } from 'src/app/models/genre/genre-model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = environment.API_URL;
  private booksFound: Book[] = [];
  private booksFoundUpdated = new BehaviorSubject<Book[]>([]);
  private searchTitleUpdated = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  getBookSearchListener() {
    return this.booksFoundUpdated.asObservable();
  }

  getSearchResults(title: string) {
    const url = `${this.apiUrl}/books/?search=${title}`;
    this.http.get<Book[]>(url)
      .subscribe((result: Book[]) => {
        this.booksFound = result;
        this.booksFoundUpdated.next([...this.booksFound]);
        this.searchTitleUpdated.next(title);
      });
  }

  searchTitleListener() {
    return this.searchTitleUpdated.asObservable();
  }

  clearSearchResults() {
    this.booksFound = [];
    this.booksFoundUpdated.next([...this.booksFound]);
  }

  getAllBooks() {
    const url = `${this.apiUrl}/books/`;
    // const url = `${this.apiUrl}/books?_expand=author&_expand=publisher&_sort=authorName&_order=asc`;
    return this.http.get<Book[]>(url);
  }

  getBooksByGenre(genre: number) {
    const url = `${this.apiUrl}/genres/${genre}`
    // const url = `${this.apiUrl}/books?_expand=author&_expand=publisher&_sort=authorName&_order=asc&genre_like=${genre}`
    return this.http.get<Genre>(url)
      .pipe(map((result: Genre) => {
        return result.books;
      }));
  }

  getBookById(id: number) {
    const url = `${this.apiUrl}/books/${id}/`
    // const url = `${this.apiUrl}/books?_expand=author&_expand=publisher&isbn=${isbn}`
    return this.http.get<Book>(url);
  }

  getBooksByTag(tag: string) {
    const url = `${this.apiUrl}/books`
    return this.http.get<Book[]>(url)
      .pipe(map((result: Book[]) => {
        return result.filter(book => book.tags.includes(tag)) as Book[];
      }));
  }

  // getBooksByPublisher(publisherId: string) {
  //   const url = `${this.apiUrl}/publisher/${publisherId}/books?_expand=author&_expand=publisher`
  //   return this.http.get<Book[]>(url);
  // }

  // getBooksByauthor(authorId: number) {
  //   const url = `${this.apiUrl}/author/${authorId}/books?_expand=author&_expand=publisher`
  //   return this.http.get<Book[]>(url);
  // }

  oderBooksByAuthorNameAsc(books: Book[]) {
    books.sort((a, b) => {
      const nameA = a.author.name.toLowerCase();
      const nameB = b.author.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return books;
  }

  getSubscriptionBooks() {
    const url = `${this.apiUrl}/books`
    return this.http.get<Book[]>(url)
      .pipe(map((result: Book[]) => {
        return result.filter(book => book.subscription) as Book[];
      }));
  }
}
