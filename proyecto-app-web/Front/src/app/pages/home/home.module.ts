import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component'
import { HeaderComponent } from './header/header.component';
import { BookCardModule } from '../../modules/book/book-card.module';


@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BookCardModule
  ]
})
export class HomeModule { }
