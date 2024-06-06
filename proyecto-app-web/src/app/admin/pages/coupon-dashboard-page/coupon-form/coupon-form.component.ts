import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponDashboardService } from 'src/app/admin/services/coupon/coupon-dashboard.service';
import { Coupon, createCouponDTO } from 'src/app/models/coupon/coupon-model';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent {
  @Input() couponId: string | number = '';
  @Input() action: 'create' | 'edit' | 'delete' = 'create';

  newCoupon!: createCouponDTO;
  couponForm!: FormGroup;
  coupon!: Coupon;

  isDeleteForm: boolean = false

  errorMessages = {
    name: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' }
    ],
  }


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private couponDashboardService: CouponDashboardService,
  ) { }

  ngOnInit(): void {
    this.isDeleteForm = this.action === 'delete';

    this.createForm();

    if (this.couponId) {
      this.getCouponById();
    }
  }

  getCouponById() {
    this.couponDashboardService.getCouponById(this.couponId)
      .subscribe((result: Coupon) => {
        this.coupon = result;
        this.couponForm.get('name')?.setValue(this.coupon.name);
        this.couponForm.get('discount')?.setValue(this.coupon.discount);
      });
  }

  onSaveHandle(event: Event) {
    event.preventDefault;
    this.couponForm.markAllAsTouched();

    if (this.action === 'create') {
      this.saveNewCoupon();
    }

    if (this.action === 'edit') {
      this.saveUpdateCoupon();
    }
  }

  saveNewCoupon() {
    this.newCoupon = {
      name: this.couponForm.value.name as string,
      discount: this.couponForm.value.discount as number,
    }

    this.couponDashboardService.saveCoupon(this.newCoupon)
      .subscribe((result: Coupon) => {
        let coupon: Coupon = result;

        if (coupon) {
          this.activeModal.close(true);
        }
      });
  }

  saveUpdateCoupon() {
    this.coupon.name = this.couponForm.value.name as string;
    this.coupon.discount = this.couponForm.value.discount as number;
    this.couponDashboardService.updateCoupon(this.coupon)
      .subscribe((result: Coupon) => {
        let author: Coupon = result;

        if (author) {
          this.activeModal.close(true);
        }
      });
  }

  onConfirmDelete() {
    this.couponDashboardService.deleteCoupon(this.couponId)
      .subscribe(() => {
        this.activeModal.close(true);
      });
  }

  onClose() {
    this.activeModal.close(false);
  }

  createForm() {
    this.couponForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      discount: ['', [Validators.required]]
    });
  }

  get name() {
    return this.couponForm.get('name');
  }

  get discount() {
    return this.couponForm.get('discount');
  }
}
