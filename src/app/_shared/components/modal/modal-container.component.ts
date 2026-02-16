import {
  Component,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ActiveModal } from '../../models/modal/active-modal';
import { animate, style, transition, trigger, state } from '@angular/animations';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule, CdkPortalOutlet],
  templateUrl: './modal-container.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalContainerComponent {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  sizeClass = 'max-w-lg';

  constructor(
    public activeModal: ActiveModal,
    private elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
  ) {}
}
