import { Routes } from '@angular/router';
import { MainShellComponent } from './_shared/components/layout/main-shell.component';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { AuthCallbackComponent } from './auth/auth-callback.component';

export const routes: Routes = [
  { path: 'auth', component: AuthCallbackComponent },
  { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'main',
    component: MainShellComponent,
    canActivate: [autoLoginPartialRoutesGuard],
    loadChildren: () => import('./main/main.routes').then((m) => m.routes),
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' },
];
