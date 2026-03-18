import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SearchBarComponent, UserAvatarComponent, BadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly navItems = [
    { label: 'Overview', route: '/main/overview' },
    { label: 'Tickets', route: '/main/tickets' },
    { label: 'Approval', route: '/main/approval' },
    { label: 'Analytics', route: '/main/analytics' },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
