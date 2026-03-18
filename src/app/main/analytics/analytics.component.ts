import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-analytics',
  imports: [Button],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Analytics & Reports</h1>
          <p class="page-subtitle">Performance metrics and ticket volume analysis for the last 30 days.</p>
        </div>
        <div class="header-actions">
          <button class="date-picker-btn">
            <i class="pi pi-calendar"></i>
            <span>Last 30 Days</span>
            <i class="pi pi-chevron-down ml-2 text-xs"></i>
          </button>
          <p-button label="Export CSV" icon="pi pi-download" styleClass="p-button-outlined p-button-secondary" />
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <span class="metric-label">Avg. Resolution Time</span>
          <div class="metric-val-row">
            <span class="metric-val">4.2h</span>
            <span class="metric-trend up"><i class="pi pi-arrow-up"></i> 12%</span>
          </div>
        </div>
        <div class="metric-card">
          <span class="metric-label">First Contact Resolution</span>
          <div class="metric-val-row">
            <span class="metric-val">68%</span>
            <span class="metric-trend up"><i class="pi pi-arrow-up"></i> 5%</span>
          </div>
        </div>
        <div class="metric-card">
          <span class="metric-label">Customer Satisfaction</span>
          <div class="metric-val-row">
            <span class="metric-val">4.8/5</span>
            <span class="metric-trend disabled"><i class="pi pi-minus"></i> 0%</span>
          </div>
        </div>
        <div class="metric-card">
          <span class="metric-label">Escalation Rate</span>
          <div class="metric-val-row">
            <span class="metric-val">12%</span>
            <span class="metric-trend down"><i class="pi pi-arrow-down"></i> 3%</span>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <!-- Ticket Volume Chart (Mock CSS-based) -->
        <div class="chart-panel">
          <div class="chart-header">
            <h3>Ticket Volume by Day</h3>
          </div>
          <div class="bar-chart">
            @for (day of volumeData; track day.label) {
              <div class="bar-col">
                <div class="bar-fill" [style.height.%]="day.value"></div>
                <span class="bar-label">{{ day.label }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Issue Categories (Mock CSS-based) -->
        <div class="chart-panel">
          <div class="chart-header">
            <h3>Top Issue Categories</h3>
          </div>
          <div class="cat-list">
            @for (cat of categoryData; track cat.name) {
              <div class="cat-row">
                <div class="cat-info">
                  <span class="cat-name">{{ cat.name }}</span>
                  <span class="cat-val">{{ cat.value }}%</span>
                </div>
                <div class="cat-bar-bg">
                  <div class="cat-bar-fill" [style.width.%]="cat.value" [style.background]="cat.color"></div>
                </div>
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
    .header-actions {
      display: flex;
      gap: 0.75rem;
    }
    .date-picker-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0 1rem;
      height: 40px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
    }
    .ml-2 { margin-left: 0.5rem; }
    .text-xs { font-size: 0.7rem; }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    @media (max-width: 1024px) {
      .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .metrics-grid { grid-template-columns: 1fr; }
    }
    .metric-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .metric-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
    }
    .metric-val-row {
      display: flex;
      align-items: flex-end;
      gap: 0.75rem;
    }
    .metric-val {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      line-height: 1;
    }
    .metric-trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      margin-bottom: 0.125rem;
    }
    .metric-trend.up { color: #059669; background: #d1fae5; }
    .metric-trend.down { color: #dc2626; background: #fee2e2; }
    .metric-trend.disabled { color: #6b7280; background: #f3f4f6; }
    
    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 1024px) {
      .charts-grid { grid-template-columns: 1fr; }
    }
    .chart-panel {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.5rem;
    }
    .chart-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 1.5rem 0;
    }
    
    /* Mock Bar Chart */
    .bar-chart {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.5rem;
      height: 250px;
      padding-top: 1rem;
    }
    .bar-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      height: 100%;
    }
    .bar-fill {
      width: 100%;
      max-width: 40px;
      background: #1E5AE6;
      border-radius: 4px 4px 0 0;
      transition: height 0.5s ease;
    }
    .bar-label {
      font-size: 0.75rem;
      color: #6b7280;
    }
    
    /* Mock Category Progress Bars */
    .cat-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .cat-row {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }
    .cat-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .cat-name { color: #374151; }
    .cat-val { color: #111827; }
    .cat-bar-bg {
      width: 100%;
      height: 8px;
      background: #f3f4f6;
      border-radius: 999px;
      overflow: hidden;
    }
    .cat-bar-fill {
      height: 100%;
      border-radius: 999px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent {
  readonly volumeData = [
    { label: 'Mon', value: 40 },
    { label: 'Tue', value: 65 },
    { label: 'Wed', value: 85 },
    { label: 'Thu', value: 45 },
    { label: 'Fri', value: 90 },
    { label: 'Sat', value: 20 },
    { label: 'Sun', value: 15 },
  ];

  readonly categoryData = [
    { name: 'Hardware / Equipment', value: 38, color: '#1E5AE6' },
    { name: 'Software Licenses', value: 25, color: '#0ea5e9' },
    { name: 'Network Access', value: 18, color: '#10b981' },
    { name: 'HR / Payroll', value: 12, color: '#f59e0b' },
    { name: 'Other', value: 7, color: '#6b7280' },
  ];
}
