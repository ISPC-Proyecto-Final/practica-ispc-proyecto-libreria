import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookDashboardPageComponent } from './pages/book-dashboard-page/book-dashboard-page.component';
import { ClientDashboardPageComponent } from './pages/client-dashboard-page/client-dashboard-page.component';
import { AuthorDashboardPageComponent } from './pages/author-dashboard-page/author-dashboard-page.component';
import { PublisherDashboardPageComponent } from './pages/publisher-dashboard-page/publisher-dashboard-page.component';

import { UserDashboardService } from './services/user/user-dashboard.service';
import { AuthorDashboardService } from './services/author/author-dashboard.service';
import { PublisherDashboardService } from './services/publisher/publisher-dashboard.service';
import { SaleDashboardService } from './services/sale/sale-dashboard.service';
import { SalesDashboardPageComponent } from './pages/sales-dashboard-page/sales-dashboard-page.component';
import { BookFormComponent } from './pages/book-dashboard-page/book-form/book-form.component';
import { BookDashboardService } from './services/book/book-dashboard.service';
import { GenreDashboardService } from './services/genre/genre-dashboard.service';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthorFormComponent } from './pages/author-dashboard-page/author-form/author-form.component';
import { PublisherFormComponent } from './pages/publisher-dashboard-page/publisher-form/publisher-form.component';
import { StoreDashboardPageComponent } from './pages/store-dashboard-page/store-dashboard-page.component';
import { AdminNavigationService } from './services/navigation/navigation.service';
import { StoreFormComponent } from './pages/store-dashboard-page/store-form/store-form.component';



@NgModule({
  declarations: [
    BookDashboardPageComponent,
    ClientDashboardPageComponent,
    AuthorDashboardPageComponent,
    PublisherDashboardPageComponent,
    SalesDashboardPageComponent,
    BookFormComponent,
    AdminPageComponent,
    AuthorFormComponent,
    PublisherFormComponent,
    StoreDashboardPageComponent,
    StoreFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserDashboardService,
    AuthorDashboardService,
    PublisherDashboardService,
    SaleDashboardService,
    BookDashboardService,
    GenreDashboardService,
    AdminNavigationService
  ]
})
export class AdminModule { }
