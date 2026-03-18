import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-main-shell',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main-shell.component.html',
  styles: [
    `
      :host {
        display: block;
      }
      .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: #f9fafb;
      }
      .app-main {
        flex: 1;
        padding: 1.5rem 2rem;
      }
      .app-content {
        max-width: 1400px;
        margin: 0 auto;
      }

      :host-context(.dark) .app-layout {
        background: #030712;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainShellComponent {}
