import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-main-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './main-shell.component.html',
  styles: [
    `
      :host {
        display: block;
      }
      .app-layout {
        display: flex;
        height: 100vh;
        overflow: hidden;
        background: #f3f4f6; /* Gray 100 to match typical app backgrounds */
      }
      .main-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
        overflow-y: auto;
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
