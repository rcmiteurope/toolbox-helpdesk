import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Discussion } from '../../../models/ticket.model';
import { UserAvatarComponent } from '../../../../../_shared/components/user-avatar/user-avatar.component';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-discussion-tab',
  imports: [UserAvatarComponent, Button, FormsModule],
  template: `
    <div class="discussions-container">
      @for (msg of discussions(); track msg.id) {
        <div class="message-card" [class.internal]="msg.visibility === 'internal'">
          <div class="message-header">
            <app-user-avatar [name]="msg.author" size="normal" />
            <div class="message-meta">
              <span class="message-author">
                {{ msg.author }}
                <span class="message-role">({{ msg.authorRole }})</span>
              </span>
              <span class="message-time">
                {{ getTimeAgo(msg.createdAt) }} at {{ formatTime(msg.createdAt) }}
              </span>
            </div>
            @if (msg.visibility === 'internal') {
              <span class="internal-badge">Internal Note</span>
            }
          </div>
          <div class="message-body">
            <p>{{ msg.message }}</p>
          </div>
        </div>
      }

      <div class="reply-box">
        <div class="reply-header">
          <app-user-avatar name="Admin User" size="normal" />
          <span>Reply to this ticket...</span>
        </div>
        <textarea
          class="reply-textarea"
          placeholder="Type your message here..."
          rows="4"
          [(ngModel)]="replyText"
        ></textarea>
        <div class="reply-actions">
          <div class="reply-tools">
            <button class="icon-btn" aria-label="Formatting"><i class="pi pi-bars"></i></button>
            <button class="icon-btn" aria-label="Attachment"><i class="pi pi-paperclip"></i></button>
          </div>
          <div class="reply-submit">
            <label class="internal-toggle">
              <input type="checkbox" [(ngModel)]="isInternal" />
              <span>Internal Note</span>
            </label>
            <p-button
              label="Send Reply"
              icon="pi pi-send"
              [disabled]="!replyText().trim()"
              (onClick)="sendReply()"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .discussions-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .message-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #ffffff;
    }

    .message-card.internal {
      background: #fffbeb;
      border-color: #fde68a;
    }

    .message-header {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      position: relative;
    }

    .message-meta {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .message-author {
      font-size: 0.875rem;
      font-weight: 600;
      color: #111827;
    }

    .message-role {
      font-weight: 400;
      color: #6b7280;
      font-size: 0.75rem;
    }

    .message-time {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .internal-badge {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #d97706;
      background: #fef3c7;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
    }

    .message-body {
      font-size: 0.875rem;
      color: #374151;
      line-height: 1.6;
    }

    .message-body p {
      margin: 0;
    }

    /* Reply Box */
    .reply-box {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #f9fafb;
      margin-top: 1rem;
    }

    .reply-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .reply-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.875rem;
      resize: vertical;
    }

    .reply-textarea:focus {
      outline: none;
      border-color: #1E5AE6;
      box-shadow: 0 0 0 2px rgba(30, 90, 230, 0.1);
    }

    .reply-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .reply-tools {
      display: flex;
      gap: 0.5rem;
    }

    .icon-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: #6b7280;
      cursor: pointer;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }

    .icon-btn:hover {
      background: #e5e7eb;
      color: #374151;
    }

    .reply-submit {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .internal-toggle {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #4b5563;
      cursor: pointer;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionTabComponent {
  readonly discussions = input.required<Discussion[]>();
  readonly replySent = output<{ text: string; isInternal: boolean }>();

  protected readonly replyText = signal('');
  protected readonly isInternal = signal(false);

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

  sendReply() {
    const text = this.replyText().trim();
    if (text) {
      this.replySent.emit({ text, isInternal: this.isInternal() });
      this.replyText.set('');
      this.isInternal.set(false);
    }
  }
}
