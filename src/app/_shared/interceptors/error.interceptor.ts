import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

/**
 * Global error interceptor to catch HTTP errors and show toasts.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = error.error.message;
      } else {
        // Server-side error
        errorMessage =
          error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      toastrService.error(errorMessage, 'Error');

      return throwError(() => error);
    }),
  );
};
