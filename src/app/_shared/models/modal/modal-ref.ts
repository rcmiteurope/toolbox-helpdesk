import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

export class ModalRef<T = any> {
  private _afterClosed = new Subject<T | undefined>();
  componentInstance: T | null = null;

  constructor(private overlayRef: OverlayRef) {
    overlayRef.backdropClick().subscribe(() => {
      this.dismiss();
    });
  }

  close(result?: T): void {
    this._afterClosed.next(result);
    this._afterClosed.complete();
    this.overlayRef.dispose();
  }

  dismiss(reason?: any): void {
    this._afterClosed.next(undefined);
    this._afterClosed.complete();
    this.overlayRef.dispose();
  }

  get afterClosed(): Observable<T | undefined> {
    return this._afterClosed.asObservable();
  }
}
