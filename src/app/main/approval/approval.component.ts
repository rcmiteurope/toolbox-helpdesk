import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { UserAvatarComponent } from '../../_shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'app-approval',
  imports: [Button, UserAvatarComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Pending Approvals</h1>
          <p class="page-subtitle">You have {{ approvals.length }} requests requiring your authorization.</p>
        </div>
        <p-button label="Approve All" icon="pi pi-check-circle" styleClass="p-button-success" />
      </div>

      <div class="approval-list">
        @for (req of approvals; track req.id) {
          <div class="approval-card">
            <div class="req-header">
              <div class="req-title-wrapper">
                <span class="req-id">#{{ req.id }}</span>
                <h3 class="req-title">{{ req.title }}</h3>
              </div>
              <span class="req-type">{{ req.type }}</span>
            </div>
            
            <div class="req-body">
              <p class="req-desc">{{ req.description }}</p>
              
              <div class="req-details">
                <div class="detail-item">
                  <span class="detail-label">REQUESTER</span>
                  <div class="requester-info">
                    <app-user-avatar [name]="req.requester" size="normal" />
                    <span>{{ req.requester }}</span>
                  </div>
                </div>
                <div class="detail-item">
                  <span class="detail-label">SUBMITTED</span>
                  <span>{{ req.submittedAt }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">COST</span>
                  <span class="cost-value">{{ req.cost }}</span>
                </div>
              </div>
            </div>
            
            <div class="req-actions">
              <p-button label="Reject" icon="pi pi-times" styleClass="p-button-outlined p-button-danger p-button-sm" />
              <p-button label="Request Info" icon="pi pi-info-circle" styleClass="p-button-outlined p-button-secondary p-button-sm" />
              <p-button label="Approve" icon="pi pi-check" styleClass="p-button-success p-button-sm" />
            </div>
          </div>
        }
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
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
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
    .approval-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .approval-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .req-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .req-title-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .req-id {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #9ca3af;
    }
    .req-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
    .req-type {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      background: #f3f4f6;
      color: #4b5563;
      border-radius: 6px;
    }
    .req-body {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .req-desc {
      font-size: 0.875rem;
      color: #4b5563;
      margin: 0;
      line-height: 1.5;
    }
    .req-details {
      display: flex;
      gap: 3rem;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 8px;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-size: 0.875rem;
      color: #111827;
    }
    .detail-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
    }
    .requester-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .cost-value {
      font-weight: 600;
      color: #059669;
    }
    .req-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 0.5rem;
      padding-top: 1rem;
      border-top: 1px solid #f3f4f6;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprovalComponent {
  readonly approvals = [
    {
      id: 'REQ-1049',
      title: 'Admin Access to Production Database',
      type: 'Security Permission',
      description: 'Requesting temporary admin access to the production database to run maintenance scripts and optimize newly deployed indexes. Access needed for 4 hours.',
      requester: 'John Smith',
      submittedAt: 'Today, 09:30 AM',
      cost: 'N/A'
    },
    {
      id: 'REQ-1048',
      title: 'Adobe Creative Cloud License',
      type: 'Software License',
      description: 'Need full Adobe CC suite for the new marketing contractor starting next week. Standard yearly subscription.',
      requester: 'Emily Chen',
      submittedAt: 'Yesterday, 02:15 PM',
      cost: '$59.99/mo'
    },
    {
      id: 'REQ-1045',
      title: 'AWS EC2 Instance Upgrade',
      type: 'Infrastructure',
      description: 'Upgrading the staging server from t3.medium to t3.large due to out-of-memory errors occurring during test suite execution.',
      requester: 'Sarah Connor',
      submittedAt: 'Oct 23, 11:00 AM',
      cost: '+$40.00/mo'
    }
  ];
}
