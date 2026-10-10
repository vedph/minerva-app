import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

function isRateLimitError(error: unknown): error is HttpErrorResponse {
  return error instanceof HttpErrorResponse && error.status === 429;
}

/**
 * Get the delay in milliseconds requested by the Retry-After header of the
 * specified response, which can be either a number of seconds or an HTTP date.
 * Returns undefined when the header is missing or invalid.
 */
function getRetryDelay(error: HttpErrorResponse): number | undefined {
  const retryAfter = error.headers.get('Retry-After')?.trim();
  if (!retryAfter) {
    return undefined;
  }
  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds)) {
    return Math.max(0, seconds) * 1000;
  }
  const date = Date.parse(retryAfter);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (error) => {
          // retry only when the server tells when it will accept requests
          // again: retrying blindly inside the same rate limit window would
          // just add more rejected requests
          const delayTime = isRateLimitError(error)
            ? getRetryDelay(error)
            : undefined;
          return delayTime === undefined
            ? throwError(() => error)
            : timer(delayTime);
        },
      }),
      catchError((error: unknown) => {
        if (isRateLimitError(error)) {
          this._snackBar.open(
            'Too many requests. Please try again later.',
            'Close',
            {
              duration: 3000,
            }
          );
          return throwError(
            () => new Error('Too many requests. Please try again later.')
          );
        } else {
          // pass any other error untouched, as consumers rely on the
          // original HttpErrorResponse (e.g. its status)
          return throwError(() => error);
        }
      })
    );
  }
}
