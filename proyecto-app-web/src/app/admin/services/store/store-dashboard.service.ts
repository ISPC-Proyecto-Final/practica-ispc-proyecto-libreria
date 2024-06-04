import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateStoreDto, Store } from 'src/app/models/store/store-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreDashboardService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllStores() {
    const url = `${this.apiUrl}/stores/`;
    return this.http.get<Store[]>(url);
  }

  getStoreById(id: number) {
    const url = `${this.apiUrl}/stores/${id}`;
    return this.http.get<Store>(url);
  }

  saveStore(store: CreateStoreDto) {
    const url = `${this.apiUrl}/stores/`;
    return this.http.post<Store>(url, store);
  }

  updateStore(id: number, store: CreateStoreDto) {
    const url = `${this.apiUrl}/stores/${id}/`;
    return this.http.put<Store>(url, store);
  }

  deleteStore(id: number) {
    const url = `${this.apiUrl}/stores/${id}`;
    return this.http.delete<Store>(url);
  }
}
