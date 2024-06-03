import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDeliveryDto, Delivery } from 'src/app/models/sale/delivery-model';
import { Store } from 'src/app/models/store/store-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  calculateShippingCost(postalCode: number): number {
    const insideFederalCapital = 1000;
    const outsideOfFederalCapital = 2000;

    const cost =
      postalCode > 1000 && postalCode < 1600
        ? insideFederalCapital
        : outsideOfFederalCapital;

    return cost;
  }

  getAllStores() {
    const url = `${this.apiUrl}/store/`;
    return this.http.get<Store[]>(url);
  }

  saveDeliveryInfo(deliveryInfo: CreateDeliveryDto) {
    const url = `${this.apiUrl}/deliverys/`;
    return this.http.post<Delivery>(url, deliveryInfo);
  }
}
