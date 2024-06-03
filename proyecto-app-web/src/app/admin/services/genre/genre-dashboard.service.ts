import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from 'src/app/models/genre/genre-model';
import { environment } from 'src/environments/environment';

@Injectable()
export class GenreDashboardService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getAllGenres() {
    const url = `${this.apiUrl}/genres/`;
    return this.http.get<Genre[]>(url);
  }

  oderGenresByAuthorNameAsc(genre: Genre[]) {
    genre.sort((a, b) => {
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

    return genre;
  }
}
