import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services//auth/auth.service';
import { Credentials } from 'src/app/models/credentials/credentials-model';
import { tap, catchError} from 'rxjs/operators';
import { regExEmail, regExPassword } from 'src/app/utils/regex/regex';
import { ToastService } from 'src/app/services/utils/toast.service';




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm!: FormGroup;

  errorMessages = {
    email: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' },
      { type: 'pattern', message: 'Ingresa un email válido.' }
    ],
    password: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'pattern', message: 'Debe contener al menos una letra mayúscula o minúscula, al menos un dígito y tener una longitud mínima de 8 caracteres'}
    ],
  }

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
    ) { }

  
    ngOnInit(): void {
      this.createForm();
    }
  
    createForm() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.maxLength(80), Validators.pattern(regExEmail)]],
        password: ['', [Validators.required, Validators.pattern(regExPassword)]],
      });
    }
  
    loginUser(){
      this.loginForm.markAllAsTouched();
      if(this.loginForm.valid){
        console.log('login valido');
        const credentials = this.getCredencials();
      this.authService.loginUser(credentials)
      .pipe(
        tap(response => {
          console.log('Usuario logueado', response);
          this.toastService.createToast({type: 'bg-success', delay: 4000, message: 'Login exitoso'});
          this.authService.updateProfileListener(response);
          this.onClickLogIn();
        }),
        catchError(error => {
          console.log('Error al ingresar', error);
          this.toastService.createToast({type: 'bg-danger', delay: 4000, message: 'Correo o contraseña inválida'});
          throw error;
        })
      )
      .subscribe();
      this.activeModal.close();
      } 
      
     
  }

//   loginUser(){

//     if(this.loginForm.valid){
//       console.log('login valido');
//       const credentials = this.getCredencials();
//     this.authService.loginAndGet(credentials)
//     .pipe(
//       tap(response => {
//         console.log('Usuario logueado', response);
//         this.authService.updateProfileListener(response);
//         this.onClickLogIn();
//       }),
//       catchError(error => {
//         console.log('Error al ingresar', error);
//         throw error;
//       })
//     )
//     .subscribe();
//     this.activeModal.close();
//     } else{
  
//       this.loginForm.markAllAsTouched
//     }
    
   
// }
  
  
    getCredencials(): Credentials  {
      return {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
    }

    get email() {
      return this.loginForm.get('email');
    }
    
    get password() {
      return this.loginForm.get('password');
    }

  onClickLogIn() {
    this.activeModal.close();
  }

  onClickClose() {
    this.activeModal.close();
  }

  onClickEnterRegister(){
    const modalRef = this.modalService.open(RegisterPageComponent, { fullscreen: true});
    this.activeModal.close();
  }

}
