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
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.2rem 0.6rem;
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
        return 'secondary';
      case 'Low':
        return 'success';
      default:
        return 'info';
    }
  });
}
