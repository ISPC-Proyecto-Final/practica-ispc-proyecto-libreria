import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store/store-models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = environment.API_URL;
  private stores: Store[] = [];

  constructor(private http: HttpClient) {}

  getAllStores() {
    const url = `${this.apiUrl}/stores/`;

    return this.http.get<Store[]>(url);
  }
}
