import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { regExEmail, regExExpirationDate, regExOnlyNumbers } from 'src/app/utils/regex/regex';
import { DELIVERY_STATUS, DELIVERY_TYPE, PAYMENT_TYPE } from 'src/app/utils/enums/sale.enum';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { CreateDeliveryDto, Delivery } from 'src/app/models/sale/delivery-model';
import { PaymentData } from 'src/app/models/sale/payment-model';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { CreateSaleDto, Sale } from 'src/app/models/sale/sale-model';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { SelectedBookDto } from 'src/app/models/book/book-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user-model';
import { StoreService } from 'src/app/services/store/store.service';
import { Store } from 'src/app/models/store/store-models';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup: FormGroup;

  deliveryTypes = DELIVERY_TYPE;
  paymentTypes = PAYMENT_TYPE;
  selectedPaymentType: string = this.paymentTypes.EFECTIVO;
  selectedDeliveryType: string = this.deliveryTypes.SUCURSAL;
  showDeliveryForm: boolean = false;
  showCardPayment: boolean = false;

  profileSub!: Subscription;
  cartSub!: Subscription;
  totalItemSub!: Subscription;
  totalCostSub!: Subscription;

  books: SelectedBookDto[] = [];
  totalItems: number = 0;
  totalCost: number = 0;
  profile: User | null = null;
  orderNumber: number | string = '';
  stores: Store[] = [];

  stepperOrientation: Observable<StepperOrientation>;
  icons = ['./assets/img/stepper/Camion.png', 'icono-2', 'icono-3'];

  errorMessages = {
    name: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' }
    ],
    document: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 7 dígitos' },
      { type: 'maxlength', message: 'Máximo 8 dígitos.' },
      { type: 'pattern', message: 'Ingresa sólo números.' }
    ],
    areaCode: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 2 dígitos' },
      { type: 'maxlength', message: 'Máximo 4 dígitos.' },
      { type: 'pattern', message: 'Ingresa sólo números.' }
    ],
    telephone: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 6 dígitos' },
      { type: 'maxlength', message: 'Máximo 8 dígitos.' },
      { type: 'pattern', message: 'Ingresa sólo números.' }
    ],
    location: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 50 caracteres.' }
    ],
    province: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 50 caracteres.' }
    ],
    address: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' }
    ],
    postalCode: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 4 dígitos' },
      { type: 'maxlength', message: 'Máximo 4 dígitos.' },
      { type: 'pattern', message: 'Ingresa sólo números.' }
    ],
    email: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' },
      { type: 'pattern', message: 'Ingresa un email válido.' }
    ],
    cardName: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' }
    ],
    cardNumber: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 13 dígitos' },
      { type: 'maxlength', message: 'Máximo 18 dígitos' }
    ],
    expirationDate: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'pattern', message: 'Ingresa una fecha válida.' }
    ],
    cvv: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 3 dígitos' },
      { type: 'maxlength', message: 'Máximo 4 dígitos' }
    ],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private deliveryService: DeliveryService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private authService: AuthService,
    breakpointObserver: BreakpointObserver,
    private storeService: StoreService,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.createFirstForm();
    this.createSecondForm();

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.profileSubscribe();
    this.cartSubscribe();
    this.totalItemSubscribe();
    this.totalCostSubscribe();
    this.getAllStores();
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.totalItemSub.unsubscribe();
    this.totalCostSub.unsubscribe();
    this.profileSub.unsubscribe();
  }

  profileSubscribe() {
    this.profileSub = this.authService.getProfileListener()
      .subscribe((user) => {
        this.profile = user;
      });
  }

  cartSubscribe() {
    this.cartSub = this.cartService
      .getcartUpdatedListener()
      .subscribe((books: SelectedBookDto[]) => {
        this.books = books;
      });
  }

  totalItemSubscribe() {
    this.totalItemSub = this.cartService
      .getTotalItemsListener()
      .subscribe((totalItems: number) => {
        this.totalItems = totalItems;
      });
  }

  totalCostSubscribe() {
    this.totalCostSub = this.cartService
      .getTotalCostListener()
      .subscribe((totalCost: number) => {
        this.totalCost = totalCost;
      });
  }

  createFirstForm() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.maxLength(80), Validators.pattern(regExEmail)]],
      areaCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern(regExOnlyNumbers)]],
      telephone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern(regExOnlyNumbers)]],
      document: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(regExOnlyNumbers)]],
      location: [''],
      province: [''],
      address: [''],
      postalCode: ['']
    });
  }

  createSecondForm() {
    this.secondFormGroup = this._formBuilder.group({
      cardName: [''],
      cardNumber: [''],
      expirationDate: [''],
      cvv: [''],
    });
  }

  setDeliveryRequire() {
    if (!this.showDeliveryForm) {
      this.location?.clearValidators();
      this.location?.updateValueAndValidity();
      this.province?.clearValidators();
      this.province?.updateValueAndValidity();
      this.address?.clearValidators();
      this.address?.updateValueAndValidity();
      this.postalCode?.clearValidators();
      this.postalCode?.updateValueAndValidity();
      return;
    }

    this.location?.setValidators([Validators.required, Validators.maxLength(50)]);
    this.location?.updateValueAndValidity();
    this.province?.setValidators([Validators.required, Validators.maxLength(50)]);
    this.province?.updateValueAndValidity();
    this.address?.setValidators([Validators.required, Validators.maxLength(80)]);
    this.address?.updateValueAndValidity();
    this.postalCode?.setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(regExOnlyNumbers)]);
    this.postalCode?.updateValueAndValidity();
  }

  setPaymentRequire() {
    if (this.selectedPaymentType === this.paymentTypes.EFECTIVO) {
      this.cardName?.clearValidators();
      this.cardName?.updateValueAndValidity();
      this.cardNumber?.clearValidators();
      this.cardNumber?.updateValueAndValidity();
      this.expirationDate?.clearValidators();
      this.expirationDate?.updateValueAndValidity();
      this.cvv?.clearValidators();
      this.cvv?.updateValueAndValidity();
      return;
    }

    this.cardName?.setValidators([Validators.required, Validators.maxLength(80)]);
    this.cardName?.updateValueAndValidity();
    this.cardNumber?.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(18)]);
    this.cardNumber?.updateValueAndValidity();
    this.expirationDate?.setValidators([Validators.required, Validators.pattern(regExExpirationDate)]);
    this.expirationDate?.updateValueAndValidity();
    this.cvv?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(4)]);
    this.cvv?.updateValueAndValidity();
  }

  selectDeliveryType(deliveryType: string) {
    this.selectedDeliveryType = deliveryType;
    this.showDeliveryForm = this.selectedDeliveryType !== this.deliveryTypes.SUCURSAL;
    this.setDeliveryRequire();
  }

  selectPaymentType(paymentType: string) {
    this.selectedPaymentType = paymentType;
    this.showCardPayment = this.selectedPaymentType === this.paymentTypes.CREDITO;
    this.setPaymentRequire();
  }

  checkoutFormValid() {
    return this.firstFormGroup.valid && this.secondFormGroup.valid;
  }

  getDeliveryData() {
    const deliveryData: CreateDeliveryDto = {
      name: this.firstFormGroup.value.name as string,
      document: this.firstFormGroup.value.document as number,
      email: this.firstFormGroup.value.email as string,
      telephone_area_code: this.firstFormGroup.value.areaCode as string,
      telephone_number: this.firstFormGroup.value.telephone as string,
      address_province: this.firstFormGroup.value.province as string,
      address_location: this.firstFormGroup.value.location as string,
      address_street: this.firstFormGroup.value.address as string,
      postal_code: this.firstFormGroup.value.postalCode as string,
      status: DELIVERY_STATUS.PREPARANDO
    }

    return deliveryData;
  }

  getPaymentData() {
    const paymentData: PaymentData = {
      ownerName: this.secondFormGroup.value.cardName as string,
      cardNumber: this.secondFormGroup.value.cardNumber as number,
      expirationDate: this.secondFormGroup.value.expirationDate as string,
      ccv: this.secondFormGroup.value.cvv as number,
      totalAmount: this.totalCost
    }

    return paymentData;
  }

  async getSaleInfo() {
    if (!this.books.length || !this.profile) {
      return;
    }

    let deliveryInfo: Delivery = await this.saveDelivery();
    let selectedBooks: number[] = [];
    this.books.forEach(book => selectedBooks.push(book.id_book))

    const date = new Date();
    const dateConfig: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatedDate = date.toLocaleDateString('es-ES', dateConfig);

    let sellInfo: CreateSaleDto = {
      delivery_id: deliveryInfo.id_delivery,
      saleDate: formatedDate,
      paymentType: this.selectedPaymentType,
      deliveryType: this.selectedDeliveryType,
      totalCost: this.totalCost,
      totalQuantity: this.totalItems,
      book_ids: selectedBooks,
      user_id: this.profile.id_user
    }

    return sellInfo;;
  }

  confirmPurchase(event: Event) {
    event.preventDefault;
    this.firstFormGroup.markAllAsTouched();
    this.secondFormGroup.markAllAsTouched();

    // if (!this.checkoutFormValid()) {
    //   return;
    // }

    this.processPurchase();
  }

  processPayment(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let paymentData = this.getPaymentData();
      this.paymentService.processPayment(paymentData)
        .subscribe((result: { status: string }) => {
          resolve(result.status === 'ok');
        });
    });
  }

  saveDelivery(): Promise<Delivery> {
    return new Promise<Delivery>((resolve) => {
      let deliveryInfo = this.getDeliveryData();
      this.deliveryService.saveDeliveryInfo(deliveryInfo)
        .subscribe((result: Delivery) => {

          resolve(result);
        });
    });
  }

  async processPurchase() {
    this.cartService.clearCart();
    let paymentStatus = await this.processPayment();

    if (!paymentStatus) {
      return
    }

    let sellInfo: CreateSaleDto | undefined = await this.getSaleInfo();

    if (!sellInfo) {
      return;
    }

    this.paymentService.saveSell(sellInfo)
      .subscribe((result: Sale) => {
        this.orderNumber = result.id_sell;
        this.cartService.clearCart();
      });
  }

  onClickBackToCart() {
    this.navigationService.navigateToCartDetail();
  }

  onClickBackToCatalogue() {
    this.navigationService.navigateToCatalogue();
  }

  getAllStores() {
    this.storeService.getAllStores().subscribe((result: Store[]) => {
      this.stores = result;
    });
  }

  get name() {
    return this.firstFormGroup.get('name');
  }

  get document() {
    return this.firstFormGroup.get('document');
  }

  get areaCode() {
    return this.firstFormGroup.get('areaCode');
  }

  get telephone() {
    return this.firstFormGroup.get('telephone');
  }

  get location() {
    return this.firstFormGroup.get('location');
  }

  get province() {
    return this.firstFormGroup.get('province');
  }

  get address() {
    return this.firstFormGroup.get('address');
  }

  get postalCode() {
    return this.firstFormGroup.get('postalCode');
  }

  get email() {
    return this.firstFormGroup.get('email');
  }

  get cardName() {
    return this.secondFormGroup.get('cardName');
  }

  get cardNumber() {
    return this.secondFormGroup.get('cardNumber');
  }

  get expirationDate() {
    return this.secondFormGroup.get('expirationDate');
  }

  get cvv() {
    return this.secondFormGroup.get('cvv');
  }

}
