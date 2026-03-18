import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineEvent } from '../../../main/tickets/models/ticket.model';

@Component({
  selector: 'app-activity-timeline',
  template: `
    <div class="timeline" role="list" aria-label="Activity timeline">
      @for (event of events(); track event.id) {
        <div class="timeline-item" role="listitem">
          <div class="timeline-connector">
            <div class="timeline-icon" [class]="'icon-' + event.type">
              @switch (event.type) {
                @case ('created') { <i class="pi pi-plus"></i> }
                @case ('assigned') { <i class="pi pi-users"></i> }
                @case ('escalated') { <i class="pi pi-exclamation-triangle"></i> }
                @case ('status-change') { <i class="pi pi-refresh"></i> }
                @case ('attachment') { <i class="pi pi-paperclip"></i> }
                @default { <i class="pi pi-circle"></i> }
              }
            </div>
            <div class="timeline-line"></div>
          </div>
          <div class="timeline-content">
            <span class="timeline-time">{{ formatTime(event.createdAt) }}</span>
            <h4 class="timeline-title">{{ event.description }}</h4>
            <p class="timeline-detail">{{ event.detail }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .timeline-item {
      display: flex;
      gap: 0.75rem;
      min-height: 80px;
    }
    .timeline-connector {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 32px;
      flex-shrink: 0;
    }
    .timeline-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      flex-shrink: 0;
      background: #EEF2FF;
      color: #1E5AE6;
      border: 2px solid #ffffff;
      z-index: 1;
    }
    .icon-created {
      background: #DBEAFE;
      color: #1E5AE6;
    }
    .icon-assigned {
      background: #E0E7FF;
      color: #4F46E5;
    }
    .icon-escalated {
      background: #FEF3C7;
      color: #D97706;
    }
    .icon-status-change {
      background: #D1FAE5;
      color: #059669;
    }
    .icon-attachment {
      background: #F3F4F6;
      color: #6B7280;
    }
    .timeline-line {
      width: 2px;
      flex: 1;
      background: #E5E7EB;
      margin-top: 4px;
    }
    .timeline-item:last-child .timeline-line {
      display: none;
    }
    .timeline-content {
      padding-bottom: 1.25rem;
    }
    .timeline-time {
      font-size: 0.7rem;
      color: #9CA3AF;
      font-weight: 500;
    }
    .timeline-title {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #111827;
      margin: 0.125rem 0 0.125rem 0;
    }
    .timeline-detail {
      font-size: 0.75rem;
      color: #6B7280;
      margin: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityTimelineComponent {
  readonly events = input.required<TimelineEvent[]>();

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}
