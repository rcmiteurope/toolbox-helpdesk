import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { MainShellComponent } from './_shared/components/layout/main-shell.component';
import { authGuard } from './_shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  {
    path: 'main',
    component: MainShellComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./main/main.routes').then((m) => m.routes),
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' },
];
