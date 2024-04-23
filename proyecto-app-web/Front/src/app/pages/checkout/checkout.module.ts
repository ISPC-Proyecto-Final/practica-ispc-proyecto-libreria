import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
  ]
})
export class CheckoutModule { }
