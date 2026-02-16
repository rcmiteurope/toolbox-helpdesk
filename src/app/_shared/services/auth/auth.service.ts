import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isLoggedIn';

  private _isLoggedIn = signal<boolean>(localStorage.getItem(this.AUTH_KEY) === 'true');

  readonly isLoggedIn = computed(() => this._isLoggedIn());

  login() {
    localStorage.setItem(this.AUTH_KEY, 'true');
    this._isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
    this._isLoggedIn.set(false);
  }
}
