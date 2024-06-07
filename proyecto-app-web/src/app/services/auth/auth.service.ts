import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/app/models/auth/auth-model';
import { Credentials } from 'src/app/models/credentials/credentials-model';
import { BehaviorSubject, Observable, Subject, map, switchMap, tap } from 'rxjs';
import { CreateUserDTO, User, UserUpdate } from 'src/app/models/user/user-model';
import { Purchase } from 'src/app/models/user/purchase-model';
import { Sale } from 'src/app/models/sale/sale-model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}`;
  private authApiUrl = `${environment.AUTH_API_URL}`;
  private currentUser!: Auth;
  private profile!: User | null;
  private profileListener = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient
  ) { }

  loginUser(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${this.authApiUrl}/login/`, credentials);
  }

  updateUser(user: UserUpdate) {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.profile?.token}`);
    const endpoint = `${this.authApiUrl}/user/update/`;
    return this.http.put<User>(endpoint, user, { headers });
  }

  deleteAccount(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.profile?.token}`);
    return this.http.delete(`${this.authApiUrl}/users/${this.profile?.id_user}/`, { headers });
  }

  updateProfileListener(profile: User) {
    this.profile = profile;
    this.profileListener.next({ ...this.profile });
  }

  clearProfile() {
    this.profileListener.next(null);
  }

  getProfileListener() {
    return this.profileListener.asObservable();
  }

  logoutUser(): Observable<boolean> {
    console.log('logout');
    return this.http.post(`${this.authApiUrl}/logout/`, {}, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response.status === 200;
      })
    );
  }

  getBookPurchases(userId: number): Observable<Sale[]> {
    const url = `${this.apiUrl}/sells?user_id=${userId}`; // Ajusta la URL para obtener las compras del usuario específico
    return this.http.get<Sale[]>(url);
  }
}
