import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactMessage } from 'src/app/models/contact/contact-message-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = `${environment.API_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  saveContactMessage(message: ContactMessage) {
    const url = `${this.apiUrl}/contact-messages/`;
    return this.http.post<ContactMessage>(url, message);
  }
}
