import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

/**
 * Interceptor to manage global loading state during HTTP requests.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Skip loading for specific requests if needed (e.g., background polls)
  if (req.headers.has('X-Skip-Loading')) {
    return next(req);
  }

  const loadingKey = req.headers.get('X-Loading-Key') || 'global';
  const modifiedReq = req.headers.has('X-Loading-Key')
    ? req.clone({ headers: req.headers.delete('X-Loading-Key') })
    : req;

  loadingService.show(loadingKey);

  return next(modifiedReq).pipe(
    finalize(() => {
      loadingService.hide(loadingKey);
    }),
  );
};
