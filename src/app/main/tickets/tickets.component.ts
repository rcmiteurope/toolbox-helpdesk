import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TicketService } from './services/ticket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ModalService } from '../../_shared/services/modal/modal.service';
import { LoadingService } from '../../_shared/services/loading/loading.service';
import { finalize, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Ticket } from './models/ticket.model';
import { StatCardComponent } from '../../_shared/components/stat-card/stat-card.component';
import { StatusBadgeComponent } from '../../_shared/components/status-badge/status-badge.component';
import { PriorityBadgeComponent } from '../../_shared/components/priority-badge/priority-badge.component';
import { UserAvatarComponent } from '../../_shared/components/user-avatar/user-avatar.component';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';

type FilterType = 'all' | 'assigned' | 'urgent' | 'closed';

@Component({
  selector: 'app-tickets',
  imports: [
    StatCardComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    UserAvatarComponent,
    Button,
    Skeleton,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit {
  private readonly ticketService = inject(TicketService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);
  protected readonly loadingService = inject(LoadingService);

  protected readonly tickets = this.ticketService.tickets;
  protected readonly stats = this.ticketService.stats;
  protected readonly selectedTicket = this.ticketService.selectedTicket;
  protected readonly activeFilter = signal<FilterType>('all');

  protected readonly filteredTickets = computed(() => {
    const all = this.tickets();
    const filter = this.activeFilter();
    switch (filter) {
      case 'assigned':
        return all.filter((t) => t.assignedTo !== null);
      case 'urgent':
        return all.filter((t) => t.priority === 'Urgent' || t.priority === 'High');
      case 'closed':
        return all.filter((t) => t.status === 'Closed' || t.status === 'Resolved');
      default:
        return all;
    }
  });

  protected readonly filterCounts = computed(() => {
    const all = this.tickets();
    return {
      all: all.length,
      assigned: all.filter((t) => t.assignedTo !== null).length,
      urgent: all.filter((t) => t.priority === 'Urgent' || t.priority === 'High').length,
      closed: all.filter((t) => t.status === 'Closed' || t.status === 'Resolved').length,
    };
  });

  protected readonly tags = ['IT Support', 'HR Desk', 'Logistics'];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loadingService.show('fetch-tickets');
    forkJoin([this.ticketService.getTickets(), this.ticketService.getStats()])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingService.hide('fetch-tickets'))
      )
      .subscribe();
  }

  openCreateTicketModal() {
    this.modalService.open(TicketFormComponent, { size: 'md' });
  }

  setFilter(filter: FilterType) {
    this.activeFilter.set(filter);
  }

  selectTicket(ticket: Ticket) {
    this.ticketService.selectTicket(ticket);
  }

  openTicketDetail(ticket: Ticket) {
    this.router.navigate(['/main/tickets', ticket.id]);
  }

  getTimeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }
}
