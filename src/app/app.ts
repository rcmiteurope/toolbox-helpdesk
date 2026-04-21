import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Toolbox');
  isLoggedIn: boolean = false;
  private oidcSecurityService = inject(OidcSecurityService);
  private router = inject(Router);

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  getToken(): void {
    this.oidcSecurityService.getAccessToken().subscribe((token) => {
      if (!token) {
        console.warn('No access token available. User might not be logged in or token expired.');
      }
    });
  }

  logoutAppOnly(): void {
    this.oidcSecurityService.logoffLocal();
    this.router.navigate(['/auth']);
  }
}
