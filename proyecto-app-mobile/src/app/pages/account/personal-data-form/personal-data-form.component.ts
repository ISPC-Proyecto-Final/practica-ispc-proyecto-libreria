import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user-model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.css']
})
export class PersonalDataFormComponent {

  @Input() Data!: User;
  @Output() dataUpdated = new EventEmitter<any>();

  formUser!: FormGroup;


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

  get name(){
    return this.formUser.get('name') as FormControl;
  }

  get document(){
    return this.formUser.get('document') as FormControl;
  }

  get telephone_area_code(){
    return this.formUser.get('telephone_area_code') as FormControl;
  }

  get telephone_number(){
    return this.formUser.get('telephone_number') as FormControl;
  }

  get email(){
    return this.formUser.get('email') as FormControl;
  }

  ngOnInit() {
    this.formUser = this.formBuilder.group({
        name:[this.Data.first_name,[Validators.required, Validators.minLength(5)]],
        document:[this.Data.document,[Validators.required,Validators.pattern('^[0-9]{1,3}\.?[0-9]{3,3}\.?[0-9]{3,3}$')]],
        telephone_area_code:[this.Data.postal_code,[Validators.required]],
        telephone_number:[this.Data.telephone_number,[Validators.required]],
        email:[this.Data.email,[Validators.required, Validators.email]]

      })
    }


  guardar(){
    console.log(this.formUser);
  }

  limpiar(){
    this.formUser.reset();
  }

  updateUserData(){
    console.log('Data enviada para guardar',this.formUser.value);
    const newData: User = {...this.Data, ...this.formUser.value}
    const updatedData = newData;
    console.log('newData',newData);
    this.dataUpdated.emit(updatedData);
    this.activeModal.close();
  }
}
