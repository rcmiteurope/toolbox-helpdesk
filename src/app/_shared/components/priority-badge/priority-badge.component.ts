import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Tag } from 'primeng/tag';
import { TicketPriority } from '../../../main/tickets/models/ticket.model';

@Component({
  selector: 'app-priority-badge',
  imports: [Tag],
  template: `
    <p-tag
      [value]="priority()"
      [severity]="severity()"
      [rounded]="true"
    />
  `,
  styles: `
    :host {
      display: inline-flex;
    }
    :host ::ng-deep .p-tag {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.25rem 0.5rem;
    }
    :host ::ng-deep .p-tag.p-tag-danger {
      background: #fef2f2;
      color: #ef4444;
    }
    :host ::ng-deep .p-tag.p-tag-info {
      background: #f1f5f9;
      color: #475569;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityBadgeComponent {
  readonly priority = input.required<TicketPriority>();

  protected readonly severity = computed(() => {
    switch (this.priority()) {
      case 'Urgent':
        return 'danger';
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warn';
      case 'Normal':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'info';
    }
  });
}
