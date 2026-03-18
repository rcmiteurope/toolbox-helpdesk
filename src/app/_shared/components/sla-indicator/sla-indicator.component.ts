import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-sla-indicator',
  imports: [ProgressBar],
  template: `
    <div class="sla-indicator">
      <div class="sla-header">
        <span class="sla-label">{{ label() }}</span>
        <span class="sla-value" [class]="met() ? 'met' : 'remaining'">
          {{ value() }}
          @if (met()) {
            <i class="pi pi-check"></i>
          }
        </span>
      </div>
      <p-progressbar
        [value]="progress()"
        [showValue]="false"
        [style]="{ height: '6px' }"
        [styleClass]="met() ? 'sla-met' : 'sla-remaining'"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .sla-indicator {
      padding: 1rem;
      background: #F9FAFB;
      border-radius: 10px;
      border: 1px solid #E5E7EB;
    }
    .sla-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .sla-label {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6B7280;
    }
    .sla-value {
      font-size: 0.8125rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .sla-value.met {
      color: #059669;
    }
    .sla-value.remaining {
      color: #DC2626;
    }
    .sla-value i {
      font-size: 0.7rem;
    }
    :host ::ng-deep .sla-met .p-progressbar-value {
      background: #10B981 !important;
    }
    :host ::ng-deep .sla-remaining .p-progressbar-value {
      background: #F59E0B !important;
    }
    :host ::ng-deep .p-progressbar {
      background: #E5E7EB !important;
      border-radius: 9999px !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlaIndicatorComponent {
  readonly label = input('FIRST RESPONSE');
  readonly value = input.required<string>();
  readonly progress = input(100);
  readonly met = input(true);
}
