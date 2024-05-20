import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserBasicInfoDTO } from 'src/app/models/user/user-model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserDashboardService {

  private apiURL = `${environment.BASE_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    const url = `${this.apiURL}/users`
    // const url = `${this.apiURL}/users?_sort=authorName&_order=asc`;
    return this.http.get<UserBasicInfoDTO[]>(url);
  }
}
