import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../../models/toast/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: ToastType = 'info', title?: string, duration: number = 5000) {
    const id = crypto.randomUUID();
    const toast: Toast = { id, message, type, title, duration };

    this._toasts.update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string, title?: string, duration?: number) {
    this.show(message, 'success', title, duration);
  }

  error(message: string, title?: string, duration?: number) {
    this.show(message, 'error', title, duration);
  }

  warning(message: string, title?: string, duration?: number) {
    this.show(message, 'warning', title, duration);
  }

  info(message: string, title?: string, duration?: number) {
    this.show(message, 'info', title, duration);
  }

  remove(id: string) {
    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
