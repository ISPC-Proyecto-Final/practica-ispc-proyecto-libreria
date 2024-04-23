import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale/sale-model';
import { SaleDashboardService } from '../../services/sale/sale-dashboard.service';

@Component({
  selector: 'app-sales-dashboard-page',
  templateUrl: './sales-dashboard-page.component.html',
  styleUrls: ['./sales-dashboard-page.component.css']
})
export class SalesDashboardPageComponent implements OnInit {

  sales: Sale[] = [];

  constructor(
    private saleService: SaleDashboardService
  ) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.saleService.getAllSales()
      .subscribe((result: Sale[]) => {
        this.sales = result;
        console.log('res', this.sales);
      })
  }
}
