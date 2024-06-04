import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user-model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {

  @Input() addressData!: User;
  @Output() addressUpdated = new EventEmitter<any>();


  formAddress!: FormGroup;


  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { }

  onSave() {
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }

  get address_street(){
    return this.formAddress.get('address_street') as FormControl;
  }

  get postal_code(){
    return this.formAddress.get('postal_code') as FormControl;
  }

  get address_location(){
    return this.formAddress.get('address_location') as FormControl;
  }

  get address_province(){
    return this.formAddress.get('address_province') as FormControl;
  }

ngOnInit(){
  this.formAddress = this.formBuilder.group({
    address_street:[this.addressData.address_street,[Validators.required]],
    postal_code:[this.addressData.postal_code,[Validators.required]],
    address_location:[this.addressData.address_location,[Validators.required]],
    address_province:[this.addressData.address_province,[Validators.required]]

  })

}

updateUserAddress(){
  console.log('Data adddress enviada para guardar',this.formAddress.value);
  const newData: User = {...this.addressData, ...this.formAddress.value}
  const updatedData = newData;
  console.log('newData address',newData);
  this.addressUpdated.emit(updatedData);
  this.activeModal.close();

}

}
