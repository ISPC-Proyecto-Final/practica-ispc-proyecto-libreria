import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book, CreateBookDto } from 'src/app/models/book/book-model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookDashboardService {

  private apiUrl = environment.API_URL;
  private booksFound: Book[] = [];
  private booksFoundUpdated = new BehaviorSubject<Book[]>([]);
  private searchTitleUpdated = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient
  ) { }

  getAllBooks() {
    const url = `${this.apiUrl}/books/`;
    return this.http.get<Book[]>(url);
  }

  getBookById(id: number) {
    const url = `${this.apiUrl}/books/${id}`;
    return this.http.get<Book>(url);
  }

  saveBook(book: CreateBookDto) {
    const url = `${this.apiUrl}/books/`;
    return this.http.post<Book>(url, book);
  }

  updateBook(id: number, book: CreateBookDto) {
    const url = `${this.apiUrl}/books/${id}/`;
    return this.http.put<Book>(url, book);
  }

  deleteBook(id: number) {
    const url = `${this.apiUrl}/books/${id}/`;
    return this.http.delete<Book>(url);
  }

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
}
