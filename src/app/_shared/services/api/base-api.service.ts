import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Base API service providing common HTTP methods.
 */
export abstract class BaseApiService {
  protected readonly http = inject(HttpClient);
  protected abstract readonly baseUrl: string;

  /**
   * GET request
   */
  protected get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params });
  }

  /**
   * POST request
   */
  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body);
  }

  /**
   * PUT request
   */
  protected put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body);
  }

  /**
   * PATCH request
   */
  protected patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${url}`, body);
  }

  /**
   * DELETE request
   */
  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`);
  }
}
