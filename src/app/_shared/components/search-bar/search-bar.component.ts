import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, IconField, InputIcon, InputText],
  template: `
    <p-iconfield>
      <p-inputicon styleClass="pi pi-search" />
      <input
        type="text"
        pInputText
        [placeholder]="placeholder()"
        [attr.aria-label]="placeholder()"
      />
    </p-iconfield>
  `,
  styles: `
    :host {
      display: block;
    }
    :host ::ng-deep .p-inputtext {
      border-radius: 8px;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      font-size: 0.875rem;
      padding: 0.5rem 0.75rem 0.5rem 2.25rem;
      min-width: 240px;
    }
    :host ::ng-deep .p-inputtext:focus {
      background: #ffffff;
      border-color: var(--p-primary-color);
      box-shadow: 0 0 0 2px rgba(30, 90, 230, 0.1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  readonly placeholder = input('Search resources...');
}
