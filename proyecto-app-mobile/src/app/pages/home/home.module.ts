import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component'
import { HeaderComponent } from './header/header.component';
import { BookCardModule } from '../../modules/book/book-card.module';
import { CommonLayoutsModule } from "../../modules/layout/common-layouts.module";


@NgModule({
    declarations: [
        HomePageComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        BookCardModule,
        CommonLayoutsModule
    ]
})
export class HomeModule { }
