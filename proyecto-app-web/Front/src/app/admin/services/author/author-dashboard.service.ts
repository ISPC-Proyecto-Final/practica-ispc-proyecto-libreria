import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, createAuthorDTO } from 'src/app/models/author/author-model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthorDashboardService {

  private apiUrl = `${environment.API_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  getAllAuthors() {
    const url = `${this.apiUrl}/authors/`;
    return this.http.get<Author[]>(url);
  }

  saveAuthor(author: createAuthorDTO) {
    const url = `${this.apiUrl}/authors/`;
    return this.http.post<Author>(url, author);
  }

  updateAuthor(author: Author) {
    const url = `${this.apiUrl}/authors/${author.id_author}/`;
    return this.http.put<Author>(url, author);
  }

  getAuthorById(id: string | number) {
    const url = `${this.apiUrl}/authors/${id}`;
    return this.http.get<Author>(url);
  }

  deleteAuthor(id: string | number) {
    const url = `${this.apiUrl}/authors/${id}/`;
    return this.http.delete<Author>(url);
  }

  oderAuthorsByAuthorNameAsc(author: Author[]) {
    author.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return author;
  }
}
