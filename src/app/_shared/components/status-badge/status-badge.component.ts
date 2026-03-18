import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Tag } from 'primeng/tag';
import { TicketStatus } from '../../../main/tickets/models/ticket.model';

@Component({
  selector: 'app-status-badge',
  imports: [Tag],
  template: `
    <p-tag
      [value]="status()"
      [severity]="severity()"
      [rounded]="true"
    />
  `,
  styles: `
    :host {
      display: inline-flex;
    }
    :host ::ng-deep .p-tag {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      padding: 0.2rem 0.6rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  readonly status = input.required<TicketStatus | string>();

  protected readonly severity = computed(() => {
    switch (this.status()) {
      case 'Open':
        return 'info';
      case 'In Progress':
        return 'warn';
      case 'Resolved':
        return 'success';
      case 'Closed':
        return 'secondary';
      case 'Investigating':
        return 'warn';
      case 'Done':
        return 'success';
      case 'Pending':
        return 'secondary';
      default:
        return 'info';
    }
  });
}
