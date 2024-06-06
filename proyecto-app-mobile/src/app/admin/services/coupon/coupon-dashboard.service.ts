import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon, createCouponDTO } from 'src/app/models/coupon/coupon-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponDashboardService {

  private apiUrl = `${environment.API_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  getAllCoupons() {
    const url = `${this.apiUrl}/coupons/`;
    return this.http.get<Coupon[]>(url);
  }

  saveCoupon(coupon: createCouponDTO) {
    const url = `${this.apiUrl}/coupons/`;
    return this.http.post<Coupon>(url, coupon);
  }

  updateCoupon(coupon: Coupon) {
    const url = `${this.apiUrl}/coupons/${coupon.id_coupon}/`;
    return this.http.put<Coupon>(url, coupon);
  }

  getCouponById(id: string | number) {
    const url = `${this.apiUrl}/coupons/${id}`;
    return this.http.get<Coupon>(url);
  }

  deleteCoupon(id: string | number) {
    const url = `${this.apiUrl}/coupons/${id}/`;
    return this.http.delete<Coupon>(url);
  }

  oderCouponsByNameAsc(coupon: Coupon[]) {
    coupon.sort((a, b) => {
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

    return coupon;
  }
}
