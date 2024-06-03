import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { regExOnlyNumbers } from 'src/app/utils/regex/regex';
import { CreateStoreDto, Store } from 'src/app/models/store/store-models';
import { StoreDashboardService } from 'src/app/admin/services/store/store-dashboard.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent {

  @Input() storeId!: number;
  @Input() action: 'create' | 'edit' | 'delete' = 'create';

  store!: CreateStoreDto;
  storeForm!: FormGroup;

  formEnable: boolean = true;
  isDeleteForm: boolean = false

  errorMessages = {
    address: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' }
    ],
    province: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 50 caracteres.' }
    ],
    locality: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 50 caracteres.' }
    ],
    telephone: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 10 dígitos' },
      { type: 'maxlength', message: 'Máximo 10 dígitos.' },
      { type: 'pattern', message: 'Ingresa sólo números.' }
    ],
  };


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private storeService: StoreDashboardService,
  ) { }

  ngOnInit(): void {
    this.isDeleteForm = this.action === 'delete';

    this.createForm();

    if (typeof this.storeId !== 'undefined') {
      this.getById();
    }
  }

  getById() {
    this.storeService.getStoreById(this.storeId)
      .pipe(map((result: Store) => {
        this.storeForm.get('address')?.setValue(result.street_number);
        this.storeForm.get('province')?.setValue(result.province);
        this.storeForm.get('locality')?.setValue(result.locality);
        this.storeForm.get('telephone')?.setValue(result.telephone);
      })).subscribe();
  }

  onSaveHandle(event: Event) {
    event.preventDefault;
    this.storeForm.markAllAsTouched();

    if (this.action === 'create') {
      this.saveNewStore();
    }

    if (this.action === 'edit') {
      this.saveUpdatedStore();
    }

  }

  saveNewStore() {

    this.store = {
      locality: this.storeForm.value.locality as string,
      province: this.storeForm.value.province as string,
      street_number: this.storeForm.value.address as string,
      telephone: this.storeForm.value.telephone as string
    }

    this.storeService.saveStore(this.store)
      .subscribe((result: Store) => {
        let store: Store = result;

        if (store) {
          this.activeModal.close(true);
        }
      });
  }

  saveUpdatedStore() {

    this.store = {
      locality: this.storeForm.value.locality as string,
      province: this.storeForm.value.province as string,
      street_number: this.storeForm.value.address as string,
      telephone: this.storeForm.value.telephone as string,
    }

    this.storeService.updateStore(this.storeId, this.store)
      .subscribe((result: Store) => {
        let store: Store = result;

        if (store) {
          this.activeModal.close(true);
        }
      });
  }

  onConfirmDelete() {
    this.storeService.deleteStore(this.storeId)
      .subscribe(() => {
        this.activeModal.close(true);
      });

  }



  onClose() {
    this.activeModal.close(false);
  }

  createForm() {
    this.storeForm = this.formBuilder.group({
      address: ['', [Validators.required, Validators.maxLength(80)]],
      province: ['', [Validators.required, Validators.maxLength(50)]],
      locality: ['', [Validators.required, Validators.maxLength(50)]],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(regExOnlyNumbers)]],

    });
  }

  get address() {
    return this.storeForm.get('address');
  }

  get province() {
    return this.storeForm.get('province');
  }

  get locality() {
    return this.storeForm.get('locality');
  }

  get telephone() {
    return this.storeForm.get('telephone');
  }
}
