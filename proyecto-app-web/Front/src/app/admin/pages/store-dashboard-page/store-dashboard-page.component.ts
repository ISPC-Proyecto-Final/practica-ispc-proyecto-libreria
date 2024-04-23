import { Component, OnInit } from '@angular/core';
import { StoreDashboardService } from '../../services/store/store-dashboard.service';
import { Store } from 'src/app/models/store/store-models';
import { StoreFormComponent } from './store-form/store-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-dashboard-page',
  templateUrl: './store-dashboard-page.component.html',
  styleUrls: ['./store-dashboard-page.component.css']
})
export class StoreDashboardPageComponent implements OnInit {

  stores: Store[] = [];

  constructor(
    private modalService: NgbModal,
    private storeService: StoreDashboardService
  ) { }

  ngOnInit() {
    this.getStores();
  }

  getStores() {
    this.storeService.getAllStores()
      .subscribe((result: Store[]) => {
        this.stores = result;
      });
  }

  onCreateStore() {
    const modalRef = this.modalService.open(StoreFormComponent, { size: 'md', centered: true })
      .result.then((result: boolean) => {
        console.log('res', result);
        if (!result) {
          return;
        }
        this.getStores();
      }, () => {
        return;
      });
  }

  onEditStore(id: number) {
    const modalRef = this.modalService.open(StoreFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'edit';
    modalRef.componentInstance.storeId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getStores();
    }, () => {
      return;
    });
  }

  onDeleteStore(id: number) {
    const modalRef = this.modalService.open(StoreFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'delete';
    modalRef.componentInstance.storeId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getStores();
    }, () => {
      return;
    });
  }

}
