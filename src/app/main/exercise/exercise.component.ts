import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseComponent {
  // EXERCISE: Implement a table to display data
  // EXERCISE: Implement a method to open a modal with a reactive form
  // EXERCISE: Implement data refreshing logic using signals and/or event emitters
}
