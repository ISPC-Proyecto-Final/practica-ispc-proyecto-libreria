import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/utils/toast.service';
import { CouponDashboardService } from '../../services/coupon/coupon-dashboard.service';
import { Coupon } from 'src/app/models/coupon/coupon-model';
import { CouponFormComponent } from './coupon-form/coupon-form.component';

@Component({
  selector: 'app-coupon-dashboard-page',
  templateUrl: './coupon-dashboard-page.component.html',
  styleUrls: ['./coupon-dashboard-page.component.css']
})
export class CouponDashboardPageComponent {

  name = '';
  coupons: Coupon[] = [];

  constructor(
    private modalService: NgbModal,
    private couponDashboardService: CouponDashboardService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getCoupons();
  }

  getCoupons() {
    this.couponDashboardService.getAllCoupons()
      .subscribe((result: Coupon[]) => {
        this.coupons = this.couponDashboardService.oderCouponsByNameAsc(result);
      });
  }

  onCreateCoupon() {
    const modalRef = this.modalService.open(CouponFormComponent, { size: 'md', centered: true })
      .result.then((result: boolean) => {
        console.log('res', result);
        if (!result) {
          return;
        }
        this.toastService.createToast({ type: 'bg-success', delay: 2500, message: 'Cupón registrado' });
        this.getCoupons();
      }, () => {
        return;
      });
  }

  onEditCoupon(id: number) {
    const modalRef = this.modalService.open(CouponFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'edit';
    modalRef.componentInstance.couponId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.toastService.createToast({ type: 'bg-success', delay: 2500, message: 'Cupón modificado' });
      this.getCoupons();
    }, () => {
      return;
    });
  }

  onDeleteCoupon(id: number) {
    const modalRef = this.modalService.open(CouponFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'delete';
    modalRef.componentInstance.couponId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.toastService.createToast({ type: 'bg-success', delay: 2500, message: 'Cupón eliminado' });
      this.getCoupons();
    }, () => {
      return;
    });
  }

  onClickSearch() {

  }
}
