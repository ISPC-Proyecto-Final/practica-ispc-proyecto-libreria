import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserUpdate } from 'src/app/models/user/user-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/utils/toast.service';
import { regExOnlyNumbers } from 'src/app/utils/regex/regex';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {

  @Input() addressData!: User;
  @Output() addressUpdated = new EventEmitter<any>();

  formAddress!: FormGroup;

  errorMessages = {
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
  };

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formAddress = this.formBuilder.group({
      address: [this.addressData.address_street, [Validators.required, Validators.maxLength(80)]],
      location: [this.addressData.address_location, [Validators.required, Validators.maxLength(50)]],
      province: [this.addressData.address_province, [Validators.required, Validators.maxLength(50)]],
      postalCode: [this.addressData.postal_code, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(regExOnlyNumbers)]]
    })
  }

  onSave() {
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }

  updateProfile() {
    const userUpdate: UserUpdate = {
      address_street: this.address.value,
      postal_code: this.postalCode.value,
      address_location: this.location.value,
      address_province: this.province.value,
    }

    this.authService.updateUser(userUpdate)
      .subscribe((response: User) => {
        const user: User = response;
        this.authService.updateProfileListener(user);
        this.toastService.createToast({ type: 'bg-success', delay: 4000, message: 'Datos modificados exitosamente' });
        this.activeModal.close();
      });
  }

  get address() {
    return this.formAddress.get('address') as FormControl;
  }

  get postalCode() {
    return this.formAddress.get('postalCode') as FormControl;
  }

  get location() {
    return this.formAddress.get('location') as FormControl;
  }

  get province() {
    return this.formAddress.get('province') as FormControl;
  }
}
