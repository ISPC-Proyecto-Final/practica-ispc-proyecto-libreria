import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBadgeModule } from '@angular/material/badge';

import { FooterComponent } from './footer/footer.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModule } from '../login/login.module';
import { ButtonCartComponent } from './button-cart/button-cart.component';
// import { CommonComponentsModule } from '../common-components/common-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderMenuComponent,
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
    HeaderMenuComponent,
    NavbarComponent,
    SearchComponent,
  ],
})
export class CommonLayoutsModule {}
