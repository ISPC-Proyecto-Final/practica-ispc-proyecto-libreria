import { Component } from '@angular/core';
import { Toast } from 'src/app/services/utils/toast.interface';
import { ToastService } from 'src/app/services/utils/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastComponent {
  toasts: Toast[] = [];

  constructor(
    public toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getToasts();
  }

  removeToast(toast: Toast){
    this.toastService.remove(toast)
  }

  private getToasts(){
    this.toastService.getToastsListener()
    .subscribe((toasts: Toast[])=>{
     this.toasts = toasts;
    });
  }
}
