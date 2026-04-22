import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-stat-card',
  imports: [Card],
  template: `
    <p-card [styleClass]="'stat-card'">
      <div class="stat-card-content">
        <div class="stat-card-info">
          <span class="stat-label">{{ label() }}</span>
          <div class="stat-value-row">
            <span class="stat-value">{{ value() }}</span>
            @if (change() !== null) {
              <span
                class="stat-change"
                [class.success]="changeType() === 'success'"
                [class.danger]="changeType() === 'danger'"
                [class.neutral]="changeType() === 'neutral'"
              >
                {{ (change() ?? 0) > 0 ? '+' : '' }}{{ change() }}%
              </span>
            }
          </div>
        </div>
        <div class="stat-icon">
          @if (iconClass().startsWith('pi')) {
            <i [class]="iconClass()"></i>
          } @else {
            <span class="material-symbols-outlined">{{ iconClass() }}</span>
          }
        </div>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      display: block;
    }
    :host ::ng-deep .stat-card {
      border-radius: 1rem;
      border: 1px solid var(--color-border-soft, #f3f4f6);
      box-shadow: var(--shadow-soft, 0 2px 15px -3px rgba(0, 0, 0, 0.04));
      background: var(--color-surface, #ffffff);
    }
    :host ::ng-deep .stat-card .p-card-body {
      padding: 1.5rem;
    }
    .stat-card-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .stat-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
    }
    .stat-value-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.75rem;
    }
    .stat-value {
      font-size: 1.875rem;
      font-weight: 600;
      color: var(--color-slate-charcoal, #1e293b);
      line-height: 1;
    }
    .stat-change {
      font-size: 0.7rem;
      font-weight: 700;
      border-radius: 9999px;
      padding: 0.2rem 0.5rem;
    }
    .stat-change.success {
      color: #10b981;
      background: #d1fae5;
    }
    .stat-change.danger {
      color: #ef4444;
      background: #fee2e2;
    }
    .stat-change.neutral {
      color: #9ca3af;
      background: #f3f4f6;
    }
    .stat-icon {
      color: #d1d5db;
      font-size: 1.25rem;
      margin-top: -0.25rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly change = input<number | null>(null);
  readonly changeType = input<'success' | 'danger' | 'neutral'>('success');
  readonly iconClass = input('pi pi-chart-bar');
}
