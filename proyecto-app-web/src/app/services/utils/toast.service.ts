import { Injectable } from '@angular/core';
import { Toast } from './toast.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<Toast[]>();

  private toasts: Toast[] = [];

  show(toast: Toast) {
    this.toasts.push(toast);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  getToastsListener() {
    return this.toastSubject.asObservable();
  }

  createToast(toast: Toast) {
    this.toasts.push(toast);
    this.toastSubject.next([...this.toasts]);
  }
}
