import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBadgeModule } from '@angular/material/badge';

import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModule } from '../login/login.module';
import { ButtonCartComponent } from './button-cart/button-cart.component';
// import { CommonComponentsModule } from '../common-components/common-components.module';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    FooterComponent,
    SearchBarComponent,
    SearchComponent,
    NavbarComponent,
    ButtonCartComponent,
  ],
  imports: [
    CommonModule,
    LoginModule,
    MatBadgeModule,
    // CommonComponentsModule,
    FormsModule,
  ],
  exports: [
    FooterComponent,
    SearchBarComponent,
    NavbarComponent,
    SearchComponent,
  ],
})
export class CommonLayoutsModule {}
