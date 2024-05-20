import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountDetailsComponent } from './account-details/account-details.component';
import { PedidosItemComponent } from './pedidos-item/pedidos-item.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';

@NgModule({
  declarations: [
    AccountDetailsComponent,
    PedidosItemComponent,
    AddressFormComponent,
    PersonalDataFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule
  ]
})
export class AccountModule { }
