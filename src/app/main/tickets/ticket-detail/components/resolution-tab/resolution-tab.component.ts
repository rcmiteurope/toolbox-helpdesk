import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Button } from 'primeng/button';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resolution-tab',
  imports: [Button, FormsModule],
  template: `
    <div class="resolution-container">
      @if (resolved()) {
        <div class="resolution-success">
          <div class="success-icon"><i class="pi pi-check"></i></div>
          <h3 class="success-title">Ticket Resolved</h3>
          <p class="success-desc">This ticket was successfully resolved on {{ resolutionDate() }}.</p>
          <div class="resolution-notes-display">
            <span class="notes-label">RESOLUTION NOTES</span>
            <p class="notes-text">{{ finalNotes() }}</p>
          </div>
          <p-button label="Reopen Ticket" icon="pi pi-refresh" styleClass="p-button-outlined p-button-secondary mt-4" (onClick)="onReopen()" />
        </div>
      } @else {
        <div class="resolution-form">
          <div class="form-header">
            <h3>Resolve Ticket</h3>
            <p>Close this ticket by providing a resolution summary.</p>
          </div>
          
          <div class="form-group">
            <label>Resolution Category</label>
            <select 
              class="native-select"
              [(ngModel)]="selectedCategory" 
            >
              <option [ngValue]="null" disabled selected>Select a category</option>
              @for (cat of categories; track cat) {
                <option [value]="cat">{{ cat }}</option>
              }
            </select>
          </div>
          
          <div class="form-group">
            <label>Resolution Notes</label>
            <textarea 
              rows="5" 
              class="notes-input" 
              placeholder="Describe how the issue was resolved..."
              [(ngModel)]="resolutionNotes"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <label class="notify-toggle">
              <input type="checkbox" [(ngModel)]="notifyUser" />
              <span>Notify customer via email</span>
            </label>
            <p-button 
              label="Submit Resolution" 
              icon="pi pi-check" 
              styleClass="p-button-success" 
              [disabled]="!resolutionNotes().trim() || !selectedCategory()"
              (onClick)="onSubmit()" 
            />
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .resolution-container {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      padding: 2rem;
    }
    
    /* Form */
    .resolution-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 600px;
    }
    .form-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.25rem 0;
    }
    .form-header p {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-group label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #374151;
    }
    .notes-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.875rem;
      resize: vertical;
    }
    .notes-input:focus, .native-select:focus {
      outline: none;
      border-color: #10B981;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }
    .native-select {
      width: 100%;
      height: 48px;
      padding: 0 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.875rem;
      color: #374151;
      background-color: #ffffff;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem top 50%;
      background-size: 0.65em auto;
    }
    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid #f3f4f6;
    }
    .notify-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4b5563;
      cursor: pointer;
    }
    
    /* Success State */
    .resolution-success {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem 0;
    }
    .success-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #d1fae5;
      color: #10B981;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: 1.25rem;
    }
    .success-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }
    .success-desc {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0 0 2rem 0;
    }
    .resolution-notes-display {
      width: 100%;
      max-width: 500px;
      text-align: left;
      background: #f9fafb;
      padding: 1.25rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .notes-label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      display: block;
      margin-bottom: 0.5rem;
    }
    .notes-text {
      font-size: 0.875rem;
      color: #374151;
      line-height: 1.6;
      margin: 0;
    }
    .mt-4 { margin-top: 1rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResolutionTabComponent {
  readonly resolved = input(false);
  readonly resolutionDate = input<string | null>(null);
  readonly finalNotes = input<string | null>(null);
  
  readonly resolveTicket = output<{ category: string; notes: string; notify: boolean }>();
  readonly reopenTicket = output<void>();

  readonly categories = [
    'Hardware Issue Fixed',
    'Software Bug Patched',
    'User Error Explained',
    'Network Outage Restored',
    'Third-Party Dependency',
    'Other'
  ];
  
  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly resolutionNotes = signal('');
  protected readonly notifyUser = signal(true);

  onSubmit() {
    const category = this.selectedCategory();
    const notes = this.resolutionNotes().trim();
    if (category && notes) {
      this.resolveTicket.emit({
        category,
        notes,
        notify: this.notifyUser()
      });
    }
  }

  onReopen() {
    this.reopenTicket.emit();
  }
}
