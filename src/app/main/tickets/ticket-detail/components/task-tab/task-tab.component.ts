import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Subtask } from '../../../models/ticket.model';
import { UserAvatarComponent } from '../../../../../_shared/components/user-avatar/user-avatar.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-task-tab',
  imports: [UserAvatarComponent, Button],
  template: `
    <div class="tasks-container">
      <div class="tasks-header">
        <h3>Subtasks ({{ subtasks().length }})</h3>
        <p-button label="Add Task" icon="pi pi-plus" styleClass="p-button-text p-button-sm" />
      </div>

      @for (task of subtasks(); track task.id) {
        <div class="task-card">
          <div class="task-header">
            <div class="task-title-area">
              <i
                class="pi"
                [class.pi-check-circle]="task.status === 'Done'"
                [class.text-green-500]="task.status === 'Done'"
                [class.pi-circle]="task.status !== 'Done'"
              ></i>
              <h4>{{ task.title }}</h4>
            </div>
            <div class="task-status">
              <span
                class="task-badge"
                [class]="'badge-' + task.status.toLowerCase().replace(' ', '-')"
              >
                {{ task.status }}
              </span>
            </div>
          </div>

          <div class="task-steps">
            @for (step of task.steps; track step.id) {
              <div class="task-step">
                <input
                  type="checkbox"
                  [checked]="step.status === 'completed'"
                  class="step-checkbox"
                  (change)="toggleStep(task.id, step.id, $event)"
                  [attr.aria-label]="step.description"
                />
                <span class="step-desc" [class.completed]="step.status === 'completed'">
                  {{ step.description }}
                </span>
              </div>
            }
          </div>

          <div class="task-footer">
            <div class="task-assignee">
              <app-user-avatar [name]="task.assignee" size="normal" bgColor="#4F46E5" />
              <span>{{ task.assignee }}</span>
            </div>
            @if (task.timer) {
              <div class="task-timer" [class.active]="task.realTimeActive">
                <i class="pi pi-clock"></i>
                <span>{{ task.timer }}</span>
                @if (task.realTimeActive) {
                  <span class="pulse-dot"></span>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .tasks-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .tasks-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .tasks-header h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .task-card {
      padding: 1.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .task-title-area {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }

    .task-title-area i {
      color: #9ca3af;
      margin-top: 2px;
    }

    .task-title-area h4 {
      font-size: 0.9375rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .task-badge {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .badge-in-progress { background: #dbeafe; color: #1e40af; }
    .badge-investigating { background: #fef3c7; color: #92400e; }
    .badge-done { background: #d1fae5; color: #065f46; }
    .badge-pending { background: #f3f4f6; color: #374151; }

    .task-steps {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-left: 1.75rem;
    }

    .task-step {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .step-checkbox {
      width: 1rem;
      height: 1rem;
      border-radius: 4px;
      border: 1px solid #d1d5db;
      cursor: pointer;
    }

    .step-desc {
      font-size: 0.8125rem;
      color: #4b5563;
    }

    .step-desc.completed {
      color: #9ca3af;
      text-decoration: line-through;
    }

    .task-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #f3f4f6;
    }

    .task-assignee {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #4b5563;
    }

    .task-timer {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #6b7280;
      background: #f3f4f6;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
    }

    .task-timer.active {
      color: #1e40af;
      background: #dbeafe;
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ef4444;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTabComponent {
  readonly subtasks = input.required<Subtask[]>();
  readonly stepToggled = output<{ taskId: string; stepId: string; completed: boolean }>();

  toggleStep(taskId: string, stepId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.stepToggled.emit({ taskId, stepId, completed: isChecked });
  }
}
