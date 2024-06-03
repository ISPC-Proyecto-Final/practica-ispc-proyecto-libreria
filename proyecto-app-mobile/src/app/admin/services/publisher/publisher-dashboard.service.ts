import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publisher, createPublisherDTO } from 'src/app/models/publisher/publisher-model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PublisherDashboardService {

  private apiUrl = `${environment.API_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  getAllPublishers() {
    const url = `${this.apiUrl}/publishers/`;
    return this.http.get<Publisher[]>(url);
  }

  savePublisher(publisher: createPublisherDTO) {
    const url = `${this.apiUrl}/publishers/`;
    return this.http.post<Publisher>(url, publisher);
  }

  updatePublisher(publisher: Publisher) {
    const url = `${this.apiUrl}/publishers/${publisher.id_publisher}/`;
    return this.http.put<Publisher>(url, publisher);
  }

  getPublisherById(id: string | number) {
    const url = `${this.apiUrl}/publishers/${id}`;
    return this.http.get<Publisher>(url);
  }

  deletePublisher(id: string | number) {
    const url = `${this.apiUrl}/publishers/${id}/`;
    return this.http.delete<Publisher>(url);
  }

  oderPublishersByAuthorNameAsc(publisher: Publisher[]) {
    publisher.sort((a, b) => {
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

    return publisher;
  }
}
