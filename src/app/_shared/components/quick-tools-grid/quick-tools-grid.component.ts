import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface QuickTool {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-quick-tools-grid',
  template: `
    <div class="quick-tools">
      <h3 class="tools-title">QUICK TOOLS</h3>
      <div class="tools-grid" role="toolbar" aria-label="Quick tools">
        @for (tool of tools(); track tool.label) {
          <button class="tool-btn" [attr.aria-label]="tool.label">
            <i [class]="tool.icon"></i>
            <span>{{ tool.label }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .tools-title {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6B7280;
      margin: 0 0 0.75rem 0;
    }
    .tools-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    .tool-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.375rem;
      padding: 0.875rem 0.5rem;
      border: 1px solid #E5E7EB;
      border-radius: 10px;
      background: #ffffff;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .tool-btn:hover {
      background: #F9FAFB;
      border-color: #D1D5DB;
    }
    .tool-btn:focus-visible {
      outline: 2px solid #1E5AE6;
      outline-offset: 2px;
    }
    .tool-btn i {
      font-size: 1.125rem;
      color: #374151;
    }
    .tool-btn span {
      font-size: 0.7rem;
      font-weight: 500;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickToolsGridComponent {
  readonly tools = input.required<QuickTool[]>();
}
