import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loadingMap = signal<Record<string, number>>({});

  /**
   * Global loading state. True if any process is loading.
   */
  readonly isLoading = computed(() => Object.values(this._loadingMap()).some((count) => count > 0));

  /**
   * Get loading state for a specific key (e.g., component name).
   */
  isKeyLoading(key: string): boolean {
    return (this._loadingMap()[key] || 0) > 0;
  }

  /**
   * Get the current count for a specific key.
   */
  getKeyCount(key: string): number {
    return this._loadingMap()[key] || 0;
  }

  /**
   * Increment loading count for a specific key.
   * Default key is 'global'.
   */
  show(key: string = 'global'): void {
    this._loadingMap.update((map) => ({
      ...map,
      [key]: (map[key] || 0) + 1,
    }));
  }

  /**
   * Decrement loading count for a specific key, ensuring it doesn't go below zero.
   * Default key is 'global'.
   */
  hide(key: string = 'global'): void {
    this._loadingMap.update((map) => ({
      ...map,
      [key]: Math.max(0, (map[key] || 0) - 1),
    }));
  }

  /**
   * Reset loading count for a specific key or all keys if none provided.
   */
  reset(key?: string): void {
    if (key) {
      this._loadingMap.update((map) => ({
        ...map,
        [key]: 0,
      }));
    } else {
      this._loadingMap.set({});
    }
  }
}
