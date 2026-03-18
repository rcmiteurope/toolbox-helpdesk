import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { Ticket, Discussion, TimelineEvent, Subtask } from '../models/ticket.model';
import { ActivityTimelineComponent } from '../../../_shared/components/activity-timeline/activity-timeline.component';
import { CustomerDetailsPanelComponent } from '../../../_shared/components/customer-details-panel/customer-details-panel.component';
import { QuickToolsGridComponent, QuickTool } from '../../../_shared/components/quick-tools-grid/quick-tools-grid.component';
import { SlaIndicatorComponent } from '../../../_shared/components/sla-indicator/sla-indicator.component';
import { StatusBadgeComponent } from '../../../_shared/components/status-badge/status-badge.component';
import { PriorityBadgeComponent } from '../../../_shared/components/priority-badge/priority-badge.component';
import { DiscussionTabComponent } from './components/discussion-tab/discussion-tab.component';
import { TaskTabComponent } from './components/task-tab/task-tab.component';
import { ResolutionTabComponent } from './components/resolution-tab/resolution-tab.component';
import { Button } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { BaseApiService } from '../../../_shared/services/api/base-api.service';

@Component({
  selector: 'app-ticket-detail',
  imports: [
    ActivityTimelineComponent,
    CustomerDetailsPanelComponent,
    QuickToolsGridComponent,
    SlaIndicatorComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    DiscussionTabComponent,
    TaskTabComponent,
    ResolutionTabComponent,
    Button,
    TabsModule,
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketService = inject(TicketService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly ticket = signal<Ticket | null>(null);
  protected readonly discussions = signal<Discussion[]>([]);
  protected readonly timelineEvents = signal<TimelineEvent[]>([]);
  protected readonly subtasks = signal<Subtask[]>([]);
  protected readonly activeTab = signal('0');

  protected readonly quickTools: QuickTool[] = [
    { label: 'History', icon: 'pi pi-history' },
    { label: 'Call', icon: 'pi pi-phone' },
    { label: 'Email', icon: 'pi pi-envelope' },
    { label: 'Share', icon: 'pi pi-share-alt' },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTicketData(id);
    }
  }

  private loadTicketData(id: string) {
    this.ticketService
      .getTicketById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ticket) => {
        this.ticket.set(ticket);
        this.loadRelatedData(id);
      });
  }

  private loadRelatedData(ticketId: string) {
    this.ticketService
      .getDiscussions(ticketId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((discussions) => this.discussions.set(discussions));

    // Load timeline events and subtasks from the API
    this.ticketService
      .getTimeline(ticketId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((events) => this.timelineEvents.set(events));

    this.ticketService
      .getSubtasks(ticketId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tasks) => this.subtasks.set(tasks));
  }

  goBack() {
    this.router.navigate(['/main/tickets']);
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  getTimeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  }

  onReplySent(event: { text: string; isInternal: boolean }) {
    const newDiscussion: Discussion = {
      id: Math.random().toString(),
      ticketId: this.ticket()!.id,
      author: 'Admin User',
      authorRole: 'Admin',
      message: event.text,
      visibility: event.isInternal ? 'internal' : 'public',
      createdAt: new Date().toISOString()
    };
    this.discussions.update((prev) => [...prev, newDiscussion]);
  }

  onStepToggled(event: { taskId: string; stepId: string; completed: boolean }) {
    this.subtasks.update((tasks) => 
      tasks.map((t) => {
        if (t.id !== event.taskId) return t;
        const updatedSteps = t.steps.map((s) => 
          s.id === event.stepId 
            ? { ...s, status: event.completed ? 'completed' as const : 'pending' as const, completedAt: event.completed ? new Date().toISOString() : null }
            : s
        );
        const allCompleted = updatedSteps.every(s => s.status === 'completed');
        return { ...t, steps: updatedSteps, status: allCompleted ? 'Done' : 'In Progress' };
      })
    );
  }

  onResolveTicket(event: { category: string; notes: string; notify: boolean }) {
    if (this.ticket()) {
      const updatedTicket = { ...this.ticket()!, status: 'Resolved' as const };
      this.ticket.set(updatedTicket);
    }
  }

  onReopenTicket() {
    if (this.ticket()) {
      const updatedTicket = { ...this.ticket()!, status: 'In Progress' as const };
      this.ticket.set(updatedTicket);
    }
  }
}
