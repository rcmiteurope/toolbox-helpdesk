import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Customer } from '../../../main/tickets/models/ticket.model';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-customer-details-panel',
  imports: [UserAvatarComponent],
  template: `
    <div class="panel">
      <h3 class="panel-title">{{ title() }}</h3>

      @if (customer(); as c) {
        <div class="customer-info">
          <app-user-avatar [name]="c.name" size="large" />
          <div class="customer-meta">
            <span class="customer-name">{{ c.name }}</span>
            <span class="customer-role">{{ c.role }}</span>
          </div>
        </div>

        @if (showDeviceInfo()) {
          <div class="info-block">
            <span class="info-label">Device Information</span>
            <div class="info-placeholder"></div>
          </div>
        }

        @if (showDescription()) {
          <div class="info-block">
            <span class="info-label">DESCRIPTION / BRIEF SUMMARY</span>
            <div class="info-textarea-placeholder">
              <span class="placeholder-text">Ticket Description</span>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .panel {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .panel-title {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6B7280;
      margin: 0;
    }
    .customer-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .customer-meta {
      display: flex;
      flex-direction: column;
    }
    .customer-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #111827;
    }
    .customer-role {
      font-size: 0.75rem;
      color: #6B7280;
    }
    .info-block {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .info-label {
      font-size: 0.6rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #9CA3AF;
    }
    .info-placeholder {
      height: 60px;
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
    }
    .info-textarea-placeholder {
      min-height: 80px;
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 0.75rem;
    }
    .placeholder-text {
      font-size: 0.8125rem;
      color: #D1D5DB;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDetailsPanelComponent {
  readonly customer = input.required<Customer>();
  readonly title = input('CUSTOMER DETAILS');
  readonly showDeviceInfo = input(true);
  readonly showDescription = input(true);
}
