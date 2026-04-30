import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () =>
      import('./overview/overview.component').then((m) => m.OverviewComponent),
  },
  {
    path: 'tickets',
    loadComponent: () =>
      import('./tickets/tickets.component').then((m) => m.TicketsComponent),
  },
  {
    path: 'tickets/:id',
    loadComponent: () =>
      import('./tickets/ticket-detail/ticket-detail.component').then(
        (m) => m.TicketDetailComponent
      ),
  },
  {
    path: 'approval',
    loadComponent: () =>
      import('./approval/approval.component').then((m) => m.ApprovalComponent),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./analytics/analytics.component').then((m) => m.AnalyticsComponent),
  },
   {
    path: 'design',
    loadComponent: () =>
      import('./design-system/design-system.component').then((m) => m.DesignSystemComponent),
  },
];
