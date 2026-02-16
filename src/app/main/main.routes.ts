import { Routes } from '@angular/router';
import { DesignSystemComponent } from './design-system/design-system.component';

export const routes: Routes = [
  { path: '', redirectTo: 'design-system', pathMatch: 'full' },
  { path: 'design-system', component: DesignSystemComponent },
  {
    path: 'training',
    loadComponent: () => import('./training/training.component').then((m) => m.TrainingComponent),
  },
  {
    path: 'exercise',
    loadComponent: () => import('./exercise/exercise.component').then((m) => m.ExerciseComponent),
  },
];
