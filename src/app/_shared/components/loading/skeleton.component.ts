import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="skeletonClasses()"
      [style.width]="width()"
      [style.height]="height()"
      aria-hidden="true"
    ></div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  width = input<string>('100%');
  height = input<string>('1rem');
  variant = input<'line' | 'circle' | 'rect'>('line');
  className = input<string>('');

  skeletonClasses = computed(() => {
    const base = 'bg-gray-200 dark:bg-gray-700 animate-pulse';
    const variantClass = {
      line: 'rounded',
      circle: 'rounded-full',
      rect: 'rounded-md',
    }[this.variant()];

    return `${base} ${variantClass} ${this.className()}`;
  });
}
