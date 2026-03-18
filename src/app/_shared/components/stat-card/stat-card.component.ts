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
                [class.positive]="(change() ?? 0) > 0"
                [class.negative]="(change() ?? 0) < 0"
              >
                {{ (change() ?? 0) > 0 ? '+' : '' }}{{ change() }}%
              </span>
            }
          </div>
        </div>
        <div class="stat-icon">
          <i [class]="iconClass()"></i>
        </div>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      display: block;
    }
    :host ::ng-deep .stat-card {
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    :host ::ng-deep .stat-card .p-card-body {
      padding: 1.25rem 1.5rem;
    }
    .stat-card-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .stat-label {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6b7280;
    }
    .stat-value-row {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #111827;
      line-height: 1;
    }
    .stat-change {
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
      padding: 0.125rem 0.5rem;
    }
    .stat-change.positive {
      color: #059669;
      background: #d1fae5;
    }
    .stat-change.negative {
      color: #dc2626;
      background: #fee2e2;
    }
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 1.1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly change = input<number | null>(null);
  readonly iconClass = input('pi pi-chart-bar');
}
