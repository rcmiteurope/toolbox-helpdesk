import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '../../models/toast/toast.model';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  toast = input.required<Toast>();
  close = output<string>();

  typeClasses: Record<string, string> = {
    success: 'bg-green-50 text-green-800 border-green-500 dark:bg-green-900/30 dark:text-green-300',
    error: 'bg-red-50 text-red-800 border-red-500 dark:bg-red-900/30 dark:text-red-300',
    warning:
      'bg-yellow-50 text-yellow-800 border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-300',
    info: 'bg-blue-50 text-blue-800 border-blue-500 dark:bg-blue-900/30 dark:text-blue-300',
  };
}
