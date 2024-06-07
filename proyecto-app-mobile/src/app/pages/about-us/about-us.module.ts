import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileInfoPageComponent } from './mobile-info-page/mobile-info-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';



@NgModule({
  declarations: [
    MobileInfoPageComponent,
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AboutUsModule { }
