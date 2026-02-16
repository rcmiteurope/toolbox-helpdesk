import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ActiveModal } from '../../models/modal/active-modal';
import { ModalContainerComponent } from '../../components/modal/modal-container.component';
import { DrawerContainerComponent } from '../../components/modal/drawer-container.component';
import { ModalRef } from '../../models/modal/modal-ref';
import { DRAWER_CONFIG } from '../../models/modal/drawer-config';

export interface ModalOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  backdrop?: boolean | 'static';
  centered?: boolean;
  scrollable?: boolean;
  position?: 'center' | 'left' | 'right';
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) {}

  open<T>(content: Type<T> | TemplateRef<T>, options: ModalOptions = {}): ModalRef<T> {
    const config = this._getOverlayConfig(options);
    const overlayRef = this.overlay.create(config);
    const modalRef = new ModalRef<T>(overlayRef);

    // Choose container based on position
    const isDrawer = options.position === 'left' || options.position === 'right';
    const containerComponent = isDrawer ? DrawerContainerComponent : ModalContainerComponent;

    const containerPortal = new ComponentPortal(containerComponent as any);
    containerPortal.injector = this._createInjector(modalRef, options);

    const containerRef = overlayRef.attach(containerPortal);
    const containerInstance: any = containerRef.instance;

    containerInstance.sizeClass = this._getSizeClass(options.size, isDrawer);

    if (isDrawer) {
      containerInstance.position = options.position;
      if (containerInstance.backdropClicked) {
        containerInstance.backdropClicked.subscribe(() => {
          if (options.backdrop !== 'static') {
            modalRef.dismiss();
          }
        });
      }
    }

    if (content instanceof TemplateRef) {
      containerInstance.portalOutlet.attachTemplatePortal(
        new TemplatePortal(content, containerInstance.viewContainerRef, {
          $implicit: options.data,
          close: (result: any) => modalRef.close(result),
          dismiss: (reason: any) => modalRef.dismiss(reason),
        } as any),
      );
    } else {
      const contentPortal = new ComponentPortal(content);
      contentPortal.injector = this._createContentInjector(modalRef, options);
      const contentRef = containerInstance.portalOutlet.attachComponentPortal(contentPortal);
      modalRef.componentInstance = contentRef.instance;
    }

    overlayRef.backdropClick().subscribe(() => {
      if (options.backdrop !== 'static') {
        modalRef.dismiss();
      }
    });

    return modalRef;
  }

  private _getOverlayConfig(options: ModalOptions): OverlayConfig {
    const positionStrategy = this.overlay.position().global();

    if (!options.position || options.position === 'center') {
      positionStrategy.centerHorizontally().centerVertically();
    }

    return new OverlayConfig({
      hasBackdrop: options.backdrop !== false,
      backdropClass:
        options.backdrop !== false
          ? 'cdk-overlay-dark-backdrop'
          : 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      panelClass:
        options.position === 'left' || options.position === 'right'
          ? 'drawer-panel-class'
          : 'modal-panel-class',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: '100%',
      height: '100%',
    });
  }

  private _createInjector(modalRef: ModalRef, options: ModalOptions): Injector {
    const activeModalStub = new ActiveModal();
    activeModalStub.close = (result: any) => modalRef.close(result);
    activeModalStub.dismiss = (reason: any) => modalRef.dismiss(reason);

    const providers: any[] = [{ provide: ActiveModal, useValue: activeModalStub }];

    if (options.position === 'left' || options.position === 'right') {
      providers.push({
        provide: DRAWER_CONFIG,
        useValue: { position: options.position },
      });
    }

    return Injector.create({
      parent: this.injector,
      providers,
    });
  }

  private _createContentInjector(modalRef: ModalRef, options: ModalOptions): Injector {
    return this._createInjector(modalRef, options);
  }

  private _getSizeClass(size: ModalOptions['size'], isDrawer: boolean = false): string {
    if (isDrawer) {
      switch (size) {
        case 'sm':
          return 'w-64';
        case 'md':
          return 'w-80';
        case 'lg':
          return 'w-96';
        case 'xl':
          return 'w-[32rem]';
        case 'full':
          return 'w-full';
        default:
          return 'w-80';
      }
    }

    switch (size) {
      case 'sm':
        return 'sm:max-w-sm';
      case 'lg':
        return 'sm:max-w-lg';
      case 'xl':
        return 'sm:max-w-xl';
      case 'full':
        return 'sm:max-w-full sm:m-4';
      default:
        return 'sm:max-w-md';
    }
  }
}
