import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem(this.STORAGE_KEY, currentTheme);
      this.applyTheme(currentTheme);
    });
  }

  toggleTheme(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    const html = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      html.classList.add('dark');
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      body.classList.add('light');
    }
  }
}
