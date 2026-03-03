import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  inject,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../_shared/services/modal/modal.service';
import { LoadingService } from '../../_shared/services/loading/loading.service';
import { CustomValidators } from '../../_shared/utils/validators';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly http = inject(HttpClient);
  protected readonly toastrService = inject(ToastrService);
  protected readonly modalService = inject(ModalService);
  protected readonly loadingService = inject(LoadingService);

  readonly registrationForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.passwordComplexity()]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [CustomValidators.match('password', 'confirmPassword')],
    },
  );

  selectedTab = signal<string>('buttons');

  cities = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'London' },
    { id: 3, name: 'Tokyo' },
    { id: 4, name: 'Paris' },
  ];
  selectedCity = signal<number | null>(null);

  setTab(tab: string) {
    this.selectedTab.set(tab);
  }

  triggerLoading() {
    this.loadingService.show();
    setTimeout(() => this.loadingService.hide(), 2000);
  }

  triggerError() {
    // This will trigger the global error interceptor
    this.http.get('https://httpstat.us/404').subscribe();
  }

  triggerMultipleParallelLoads() {
    // Demonstrates counter: stays true until both hide() calls run
    this.loadingService.show();
    this.loadingService.show();

    setTimeout(() => {
      this.toastrService.info('First parallel process finished');
      this.loadingService.hide();
    }, 1500);

    setTimeout(() => {
      this.toastrService.info('Second parallel process finished');
      this.loadingService.hide();
    }, 3000);
  }

  triggerSequentialLoads() {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      this.toastrService.info('Gap between requests...');

      setTimeout(() => {
        this.loadingService.show();
        setTimeout(() => {
          this.loadingService.hide();
          this.toastrService.success('Sequential sequence done');
        }, 1500);
      }, 1000);
    }, 1500);
  }

  triggerComponentLoading(key: string) {
    this.loadingService.show(key);
    setTimeout(() => this.loadingService.hide(key), 2000);
  }

  triggerKeyedParallelLoads(key: string) {
    this.loadingService.show(key);
    this.loadingService.show(key);
    setTimeout(() => {
      this.toastrService.info(`${key}: First process done`);
      this.loadingService.hide(key);
    }, 1500);
    setTimeout(() => {
      this.toastrService.info(`${key}: Second process done`);
      this.loadingService.hide(key);
    }, 3000);
  }

  triggerKeyedSequentialLoads(key: string) {
    this.loadingService.show(key);
    setTimeout(() => {
      this.loadingService.hide(key);
      setTimeout(() => {
        this.loadingService.show(key);
        setTimeout(() => this.loadingService.hide(key), 1500);
      }, 1000);
    }, 1500);
  }

  openExampleModal(template: TemplateRef<any>) {
    this.modalService.open(template, {
      size: 'md',
      centered: true,
      data: { title: 'Terms of Service', version: '2.0.1' },
    });
  }

  openExampleDrawer(template: TemplateRef<any>, position: 'left' | 'right') {
    this.modalService.open(template, {
      position,
      size: 'md',
      data: { position: position.charAt(0).toUpperCase() + position.slice(1) },
    });
  }

  showToastAtPosition(position: string) {
    this.toastrService.info(`Toast shown at ${position}`, 'Position Demo', {
      positionClass: position,
    });
  }
}
