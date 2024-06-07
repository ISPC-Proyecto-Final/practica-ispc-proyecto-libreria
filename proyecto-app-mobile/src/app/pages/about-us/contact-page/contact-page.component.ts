import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactMessage } from 'src/app/models/contact/contact-message-model';
import { Store } from 'src/app/models/store/store-models';
import { ContactService } from 'src/app/services/contact/contact.service';
import { StoreService } from 'src/app/services/store/store.service';
import { ToastService } from 'src/app/services/utils/toast.service';
import { regExEmail } from 'src/app/utils/regex/regex';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  stores: Store[] = [];

  contactMessage!: ContactMessage;
  messageForm!: FormGroup;

  errorMessages = {
    name: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' }
    ],
    email: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' },
      { type: 'pattern', message: 'Ingresa un email válido.' }
    ],
    message: [
      { type: 'required', message: 'Campo requerido.' },
    ],
  };

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllStores();
  }

  getAllStores() {
    this.storeService.getAllStores().subscribe((result: Store[]) => {
      this.stores = result;
    });
  }

  createForm() {
    this.messageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.maxLength(80), Validators.pattern(regExEmail)]],
      message: ['', [Validators.required]],
    });
  }

  onSendMessage() {
    this.messageForm.markAllAsTouched();
    if (!this.messageForm.valid) {
      return;
    }

    this.contactMessage = {
      name: this.messageForm.value.name,
      email: this.messageForm.value.email,
      message: this.messageForm.value.message
    }

    this.contactService.saveContactMessage(this.contactMessage)
      .subscribe((result: ContactMessage) => {
        const message: ContactMessage = result;

        const type = message ? 'bg-success' : 'bg-danger';
        const mesage = message ? 'Mensaje enviado' : 'Error al enviar el mensaje';

        this.toastService.createToast({ type: type, delay: 4000, message: mesage });

        if (mesage) {
          this.messageForm.get('name')?.setValue('');
          this.messageForm.get('email')?.setValue('');
          this.messageForm.get('message')?.setValue('');
          this.messageForm.markAsUntouched();
        }
      });
  }

  get name() {
    return this.messageForm.get('name');
  }

  get email() {
    return this.messageForm.get('email');
  }

  get message() {
    return this.messageForm.get('message');
  }
}
