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
        delay: (error, retryCount) => {
          if (error.status === 429) {
            const retryAfter = error.headers.get('Retry-After');
            const delayTime = retryAfter
              ? parseInt(retryAfter, 10) * 1000
              : 1000;
            return timer(delayTime);
          }
          return throwError(() => error);
        },
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 429) {
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
          return throwError(() => new Error(error.message));
        }
      })
    );
  }
}
