import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Toolbox');
  isLoggedIn: boolean = false;
  private readonly _destroying$ = new Subject<void>();
  private oidcSecurityService = inject(OidcSecurityService);
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._destroying$),
      )
      .subscribe((event: NavigationEnd) => {
        this.checkAuthAndHandleRedirect();
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  checkAuthAndHandleRedirect(): void {
    this.oidcSecurityService
      .checkAuth()
      .pipe(takeUntil(this._destroying$))
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        this.isLoggedIn = isAuthenticated;
        if (isAuthenticated) {
          const redirectUrl = localStorage.getItem('redirectAfterLogin');
          if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin');
            this.router.navigateByUrl(redirectUrl);
          } else {
            const currentUrl = this.router.url;
            if (
              currentUrl === '/' ||
              currentUrl.startsWith('/login') ||
              currentUrl.startsWith('/auth')
            ) {
              this.router.navigate(['/main']);
            }
          }
        } else {
          const currentUrl = this.router.url;
          if (currentUrl.startsWith('/auth') || currentUrl.startsWith('/login')) {
            this.oidcSecurityService.authorize();
          }
        }
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
    this.router.navigate(['/login']);
  }
}
