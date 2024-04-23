import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { StoreService } from 'src/app/services/store/store.service';
import { Store } from 'src/app/models/store/store-models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-helper',
  templateUrl: './store-helper.component.html',
  styleUrls: ['./store-helper.component.css'],
})
export class StoreHelperComponent implements OnInit {
  stores: Store[] = []; // Variable para almacenar la lista de tiendas

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllStores();
  }

  getAllStores() {
    this.storeService.getAllStores().subscribe((result: Store[]) => {
      this.stores = result;
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
