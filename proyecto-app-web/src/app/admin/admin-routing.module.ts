import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDashboardPageComponent } from './pages/book-dashboard-page/book-dashboard-page.component';
import { ClientDashboardPageComponent } from './pages/client-dashboard-page/client-dashboard-page.component';
import { AuthorDashboardPageComponent } from './pages/author-dashboard-page/author-dashboard-page.component';
import { PublisherDashboardPageComponent } from './pages/publisher-dashboard-page/publisher-dashboard-page.component';
import { SalesDashboardPageComponent } from './pages/sales-dashboard-page/sales-dashboard-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { StoreDashboardPageComponent } from './pages/store-dashboard-page/store-dashboard-page.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminPageComponent,
    children: [
      { path: 'client-dashboard', component: ClientDashboardPageComponent },
      { path: 'book-dashboard', component: BookDashboardPageComponent },
      { path: 'author-dashboard', component: AuthorDashboardPageComponent },
      { path: 'publisher-dashboard', component: PublisherDashboardPageComponent },
      { path: 'sales-dashboard', component: SalesDashboardPageComponent },
      { path: 'store-dashboard', component: StoreDashboardPageComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
