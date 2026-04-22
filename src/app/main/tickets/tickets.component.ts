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

type FilterType = 'all' | 'assigned' | 'assigned-to-me' | 'urgent' | 'in-progress' | 'closed' | 'for-approval' | 'resolved' | 'critical' | 'group-work' | 'unassigned' | 'rejected' | string;

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
  
  // Accordion state
  protected readonly incidentExpanded = signal<boolean>(true);
  protected readonly requestExpanded = signal<boolean>(false);
  protected readonly changeExpanded = signal<boolean>(false);

  protected readonly filteredTickets = computed(() => {
    const all = this.tickets();
    const filter = this.activeFilter();
    switch (filter) {
      case 'assigned':
        return all.filter((t) => t.assignedTo !== null);
      case 'assigned-to-me':
        return all.filter((t) => t.assignedTo === 'John Doe'); // Assuming John Doe is current user
      case 'urgent':
        return all.filter((t) => t.priority === 'Urgent');
      case 'critical':
        return all.filter((t) => t.priority === 'High' || t.priority === 'Urgent');
      case 'in-progress':
        return all.filter((t) => t.status === 'In Progress');
      case 'closed':
        return all.filter((t) => t.status === 'Closed');
      case 'resolved':
        return all.filter((t) => t.status === 'Resolved');
      case 'for-approval':
        return []; // Not supported in current model
      case 'unassigned':
        return all.filter((t) => !t.assignedTo);
      default:
        return all;
    }
  });

  protected readonly filterCounts = computed(() => {
    const all = this.tickets();
    return {
      all: all.length,
      assigned: all.filter((t) => t.assignedTo !== null).length,
      assignedToMe: all.filter((t) => t.assignedTo === 'John Doe').length,
      urgent: all.filter((t) => t.priority === 'Urgent').length,
      inProgress: all.filter((t) => t.status === 'In Progress').length,
      closed: all.filter((t) => t.status === 'Closed').length,
      resolved: all.filter((t) => t.status === 'Resolved').length,
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

  toggleIncident() {
    this.incidentExpanded.update(v => !v);
  }

  toggleRequest() {
    this.requestExpanded.update(v => !v);
  }

  toggleChange() {
    this.changeExpanded.update(v => !v);
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

  getAvatarFor(name: string): string | null {
    const avatars: Record<string, string> = {
      'John Doe': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkoK0jvQDGlLor1iQH1nY3Cy3yXFB_ULF8Tq_bpJZHEfrr5VC_SGID-3fH8Jo3A1fyXrf_jI17CVkImVKOH8RT4rJHCRB3glYm04Y5yBCQXucW-yhFZhDa89v_m5zkQcolskMECqqjjZQqsxB61wsVtEyE5oB6Un15CrkzLS8rnP13XVie8C1ETv1Tqc9pNIKoBs455k5F1BDJpKDWO4lt-XwbFplxP4xotDQAXHWpiAoC6pP7go7l_xF_CWMvc6Ip5VS2Q-Pt3F4h',
      'Jane Smith': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9mLl1s8uqPS9sejRrsgVPkEiGwurO76xlujnEC-FM4cBg2d66hRWzYiz-XnLfP-_Q0TDIktzQfGYdO3NZKgYpNF9W2fG7aiILmmF92PSsdvCDHHzQePD7mtVqSt-lQiwiS7x8vZzxaGoU6OhIqckc84242YqSN4qhcNNB4Ez2jAInXV2EYO5ah5hMAR15WtLFop8vfES_8QZgdaNKrNK6cWZrhhMsCjHQVWl_Bxed_Mc9Oz7nZEBQS0_PFzRhkez2zAV1s4uRilod',
      'Alex Rivers': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzpZKO-1Gy9bIrSmsTRMjSu6v_qnELmdud-M6PF0pRihOYu39aZIE_YsQ9rNHfdKCZDCJwIuhryWO4CRulTK_ic-f678bUyLURTF7fFA6PsS2Na0I7VvwLiQvGP3kDD-s0WGS9xMEjgWx3XWDZlCJ0-a6m_OGCIXKhMYVfWsx2kkluCUy8OtUebY5N33TSekjiTd_R2KNqEoKOWBO_ssKU-pChkRSJ6OfS8DTM5LvaFVyRyYJfgcpbwJccIcfpgPYrr3fo_NqekHb7',
      'Sarah Jenkins': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzpZKO-1Gy9bIrSmsTRMjSu6v_qnELmdud-M6PF0pRihOYu39aZIE_YsQ9rNHfdKCZDCJwIuhryWO4CRulTK_ic-f678bUyLURTF7fFA6PsS2Na0I7VvwLiQvGP3kDD-s0WGS9xMEjgWx3XWDZlCJ0-a6m_OGCIXKhMYVfWsx2kkluCUy8OtUebY5N33TSekjiTd_R2KNqEoKOWBO_ssKU-pChkRSJ6OfS8DTM5LvaFVyRyYJfgcpbwJccIcfpgPYrr3fo_NqekHb7',
    };
    return avatars[name] || null;
  }
}
