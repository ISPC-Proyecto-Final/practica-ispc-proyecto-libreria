import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User, UserUpdate } from 'src/app/models/user/user-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/utils/toast.service';
import { regExOnlyNumbers } from 'src/app/utils/regex/regex';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.css']
})
export class PersonalDataFormComponent {

  @Input() data!: User;
  @Output() dataUpdated = new EventEmitter<any>();

  formUser!: FormGroup;

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
    this.formUser = this.formBuilder.group({
      name: [this.data.first_name, [Validators.required, Validators.maxLength(80)]],
      areaCode: [this.data.telephone_area_code, [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern(regExOnlyNumbers)]],
      telephone: [this.data.telephone_number, [Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern(regExOnlyNumbers)]],
      document: [this.data.document, [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(regExOnlyNumbers)]],
    })
  }

  onSave() {
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }

  guardar() {
    console.log(this.formUser);
  }

  limpiar() {
    this.formUser.reset();
  }

  updateProfile() {
    const userUpdate: UserUpdate = {
      first_name: this.formUser.value.name,
      document: this.formUser.value.document,
      telephone_area_code: this.formUser.value.areaCode,
      telephone_number: this.formUser.value.telephone,
      // email: this.email.value,
      // username: this.email.value,
    }

    this.authService.updateUser(userUpdate)
      .subscribe((response: User) => {
        const user: User = response;
        this.authService.updateProfileListener(user);
        this.toastService.createToast({ type: 'bg-success', delay: 4000, message: 'Datos modificados exitosamente' });
        this.activeModal.close();
      });
  }

  get name() {
    return this.formUser.get('name');
  }

  get document() {
    return this.formUser.get('document');
  }

  get telephone() {
    return this.formUser.get('telephone');
  }

  get areaCode() {
    return this.formUser.get('areaCode');
  }

  // get email() {
  //   return this.formUser.get('email') as FormControl;
  // }
}
