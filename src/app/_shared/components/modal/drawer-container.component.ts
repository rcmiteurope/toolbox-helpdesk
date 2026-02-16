import {
  Component,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveModal } from '../../models/modal/active-modal';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DRAWER_CONFIG } from '../../models/modal/drawer-config';

@Component({
  selector: 'app-drawer-container',
  standalone: true,
  imports: [CommonModule, CdkPortalOutlet],
  templateUrl: './drawer-container.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerContainerComponent {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;
  @Input() position: 'left' | 'right' = 'right';
  @Output() backdropClicked = new EventEmitter<void>();

  sizeClass = 'max-w-md';

  constructor(
    public activeModal: ActiveModal,
    private elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
  ) {
    const config = inject(DRAWER_CONFIG, { optional: true });
    if (config) {
      this.position = config.position;
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.backdropClicked.emit();
    }
  }
}
