import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentData } from '../../models/sale/payment-model';
import { Sale, CreateSaleDto } from 'src/app/models/sale/sale-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = environment.BASE_URL;
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  processPayment(paymentData: PaymentData) {
    const url = `${this.baseUrl}/process-payment/`;
    return this.http.post<{ status: string }>(url, paymentData);
  }

  saveSell(sellInfo: CreateSaleDto) {
    const url = `${this.apiUrl}/sells/`;
    return this.http.post<Sale>(url, sellInfo);
  }
}
