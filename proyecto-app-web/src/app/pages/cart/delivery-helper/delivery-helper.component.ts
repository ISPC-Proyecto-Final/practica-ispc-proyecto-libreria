import { Component } from '@angular/core';
import { DeliveryService } from './../../../services/delivery/delivery.service';
import { StoreHelperComponent } from '../store-helper/store-helper/store-helper.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delivery-helper',
  templateUrl: './delivery-helper.component.html',
  styleUrls: ['./delivery-helper.component.css'],
})
export class DeliveryHelperComponent {
  postalCode: string;
  shippingCost: number;
  postalCodeError: boolean;

  constructor(private deliveryService: DeliveryService, private modalService: NgbModal) {
    this.postalCode = '';
    this.shippingCost = 0;
    this.postalCodeError = true;
  }

  calcularEnvio() {
    this.validatePostalCode()
    if (this.postalCodeError) {
      return;
    }

    this.shippingCost = this.deliveryService.calculateShippingCost(
      parseInt(this.postalCode, 10)
    );
  }

  validatePostalCode() {
    const postalCodePattern = /^[0-9]{4}$/;
    this.postalCodeError = !postalCodePattern.test(this.postalCode);
  }

  onWatchStores() {
    const modalRef = this.modalService.open(StoreHelperComponent, { size: 'lg', centered: true });
  }
}
