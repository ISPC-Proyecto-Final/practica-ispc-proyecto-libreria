import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store/store-models';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit{

  stores: Store[] = [];

  constructor(
    private storeService: StoreService,
  ){}

  ngOnInit(): void {
    this.getAllStores();
  }

  getAllStores() {
    this.storeService.getAllStores().subscribe((result: Store[]) => {
      this.stores = result;
    });
  }
}
