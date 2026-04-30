import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * SidebarComponent manages the global navigation sidebar.
 * 
 * Chosen for visual consistency and high performance through Angular's modern features.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true, // Enables better tree-shaking and component-based modularity
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  // OnPush strategy minimizes change detection cycles for better performance
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  // Using inject() for cleaner dependency management over constructor injection
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /**
   * Represents the visual state of the sidebar.
   * Using a Signal for reactive state management with minimal overhead.
   */
  readonly isExpanded = signal<boolean>(false);

  /**
   * Manages the toggle state of the collapsed/expanded view.
   */
  toggleSidebar() {
    this.isExpanded.update(v => !v);
  }

  /**
   * Handles the authentication logout flow and subsequent redirection.
   * Centralized here to ensure a clean session exit before redirecting to login.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
