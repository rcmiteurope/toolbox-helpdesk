import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-user-avatar',
  imports: [Avatar],
  template: `
    <p-avatar
      [label]="!image() ? initials() : undefined"
      [image]="image() || undefined"
      [size]="size()"
      shape="circle"
      [style]="{ 'background-color': bgColor(), color: '#ffffff', 'font-weight': '600' }"
    />
  `,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  readonly name = input.required<string>();
  readonly image = input<string | null>(null);
  readonly size = input<'normal' | 'large' | 'xlarge'>('normal');
  readonly bgColor = input('#1E5AE6');

  protected readonly initials = computed(() => {
    const parts = this.name().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0]?.substring(0, 2).toUpperCase() ?? '';
  });
}
