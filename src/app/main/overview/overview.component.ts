import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatCardComponent } from '../../_shared/components/stat-card/stat-card.component';
import { UserAvatarComponent } from '../../_shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'app-overview',
  imports: [StatCardComponent, UserAvatarComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard Overview</h1>
          <p class="page-subtitle">Welcome back, Admin. Here's what's happening today.</p>
        </div>
      </div>

      <div class="stats-grid">
        <app-stat-card label="Total Tickets" value="1,284" [change]="12" />
        <app-stat-card label="Unassigned" value="23" [change]="-5" />
        <app-stat-card label="Avg. Resolution" value="1.4 days" [change]="8" />
        <app-stat-card label="CSAT Score" value="94%" [change]="2" />
      </div>

      <div class="content-grid">
        <!-- Recent Activity -->
        <div class="panel">
          <div class="panel-header">
            <h3 class="panel-title">Recent Activity</h3>
            <button class="view-all-btn">View All</button>
          </div>
          <div class="activity-list">
            @for (item of activities; track item.id) {
              <div class="activity-item">
                <app-user-avatar [name]="item.user" size="normal" />
                <div class="activity-content">
                  <p class="activity-text"><span class="fw-semibold">{{ item.user }}</span> {{ item.action }} <span class="fw-medium text-primary">#{{ item.ticketId }}</span></p>
                  <span class="activity-time">{{ item.time }}</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Workload Distribution -->
        <div class="panel">
          <div class="panel-header">
            <h3 class="panel-title">Workload Distribution</h3>
          </div>
          <div class="distribution-list">
            @for (agent of agents; track agent.name) {
              <div class="agent-row">
                <div class="agent-info">
                  <app-user-avatar [name]="agent.name" size="normal" />
                  <span class="agent-name">{{ agent.name }}</span>
                </div>
                <div class="agent-bar-container">
                  <div class="agent-bar" [style.width.%]="(agent.tickets / maxTickets) * 100"></div>
                </div>
                <span class="agent-count">{{ agent.tickets }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .page-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.25rem 0;
    }
    .page-subtitle {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 1024px) {
      .content-grid { grid-template-columns: 1fr; }
    }
    .panel {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.5rem;
    }
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    .panel-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
    .view-all-btn {
      background: none;
      border: none;
      color: #1E5AE6;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
    }
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }
    .activity-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .activity-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .activity-text {
      font-size: 0.875rem;
      color: #374151;
      margin: 0;
    }
    .activity-time {
      font-size: 0.75rem;
      color: #9ca3af;
    }
    .fw-semibold { font-weight: 600; }
    .fw-medium { font-weight: 500; }
    .text-primary { color: #1E5AE6; }
    
    .distribution-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .agent-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .agent-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 140px;
    }
    .agent-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .agent-bar-container {
      flex: 1;
      height: 8px;
      background: #f3f4f6;
      border-radius: 999px;
      overflow: hidden;
    }
    .agent-bar {
      height: 100%;
      background: #1E5AE6;
      border-radius: 999px;
    }
    .agent-count {
      width: 30px;
      text-align: right;
      font-size: 0.875rem;
      font-weight: 600;
      color: #111827;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  readonly activities = [
    { id: 1, user: 'Sarah Connor', action: 'resolved ticket', ticketId: '4092', time: '10 mins ago' },
    { id: 2, user: 'John Smith', action: 'assigned ticket to Network Team', ticketId: '4091', time: '1 hour ago' },
    { id: 3, user: 'Admin User', action: 'replied to', ticketId: '4089', time: '2 hours ago' },
    { id: 4, user: 'Emily Chen', action: 'escalated ticket', ticketId: '4088', time: '3 hours ago' },
  ];

  readonly agents = [
    { name: 'Sarah Connor', tickets: 24 },
    { name: 'John Smith', tickets: 18 },
    { name: 'Emily Chen', tickets: 15 },
    { name: 'Michael Chang', tickets: 9 },
    { name: 'Admin User', tickets: 4 },
  ];

  readonly maxTickets = Math.max(...this.agents.map(a => a.tickets));
}
