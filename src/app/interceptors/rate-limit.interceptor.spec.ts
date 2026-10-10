import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import type { Mock } from 'vitest';

import { MatSnackBar } from '@angular/material/snack-bar';

import { RateLimitInterceptor } from './rate-limit.interceptor';

const URL = '/api/test';
const TOO_MANY = { status: 429, statusText: 'Too Many Requests' };

describe('RateLimitInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let snackBar: { open: Mock };
  let next: Mock<(value: unknown) => void>;
  let error: Mock<(error: HttpErrorResponse | Error) => void>;

  function rejectWith429(retryAfter?: string): void {
    controller.expectOne(URL).flush(null, {
      ...TOO_MANY,
      headers: retryAfter === undefined ? {} : { 'Retry-After': retryAfter },
    });
  }

  beforeEach(() => {
    vi.useFakeTimers();
    snackBar = { open: vi.fn() };
    next = vi.fn();
    error = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RateLimitInterceptor,
          multi: true,
        },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
    vi.useRealTimers();
  });

  it('should pass a successful response through', () => {
    http.get(URL).subscribe({ next, error });

    controller.expectOne(URL).flush({ ok: true });

    expect(next).toHaveBeenCalledWith({ ok: true });
    expect(error).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('should pass a non rate limit error through untouched', () => {
    http.get(URL).subscribe({ next, error });

    controller
      .expectOne(URL)
      .flush('nope', { status: 401, statusText: 'Unauthorized' });

    expect(error).toHaveBeenCalledTimes(1);
    const received = error.mock.calls[0][0] as HttpErrorResponse;
    expect(received).toBeInstanceOf(HttpErrorResponse);
    expect(received.status).toBe(401);
    expect(received.error).toBe('nope');
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('should not retry a non rate limit error', () => {
    http.get(URL).subscribe({ next, error });

    controller
      .expectOne(URL)
      .flush(null, { status: 500, statusText: 'Server Error' });
    vi.advanceTimersByTime(60_000);

    // verify in afterEach ensures no further request was made
    expect(error).toHaveBeenCalledTimes(1);
  });

  it('should fail at once when rate limited with no Retry-After', () => {
    http.get(URL).subscribe({ next, error });

    rejectWith429();

    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(error.mock.calls[0][0].message).toBe(
      'Too many requests. Please try again later.',
    );
    expect(snackBar.open).toHaveBeenCalledWith(
      'Too many requests. Please try again later.',
      'Close',
      { duration: 3000 },
    );
  });

  it('should fail at once when Retry-After is not valid', () => {
    http.get(URL).subscribe({ next, error });

    rejectWith429('soon');

    expect(error).toHaveBeenCalledTimes(1);
    expect(snackBar.open).toHaveBeenCalledTimes(1);
  });

  it('should retry after the seconds requested by Retry-After', () => {
    http.get(URL).subscribe({ next, error });

    rejectWith429('2');
    vi.advanceTimersByTime(1999);
    controller.expectNone(URL);
    vi.advanceTimersByTime(1);
    controller.expectOne(URL).flush({ ok: true });

    expect(next).toHaveBeenCalledWith({ ok: true });
    expect(error).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('should retry at the date requested by Retry-After', () => {
    vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
    http.get(URL).subscribe({ next, error });

    rejectWith429('Thu, 01 Jan 2026 10:00:05 GMT');
    vi.advanceTimersByTime(4999);
    controller.expectNone(URL);
    vi.advanceTimersByTime(1);
    controller.expectOne(URL).flush({ ok: true });

    expect(next).toHaveBeenCalledWith({ ok: true });
  });

  it('should retry at once when the Retry-After date is past', () => {
    vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
    http.get(URL).subscribe({ next, error });

    rejectWith429('Thu, 01 Jan 2026 09:00:00 GMT');
    vi.advanceTimersByTime(0);
    controller.expectOne(URL).flush({ ok: true });

    expect(next).toHaveBeenCalledWith({ ok: true });
  });

  it('should give up and notify after 3 retries', () => {
    http.get(URL).subscribe({ next, error });

    // first attempt plus 3 retries
    for (let i = 0; i < 4; i++) {
      rejectWith429('1');
      vi.advanceTimersByTime(1000);
    }

    expect(next).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0].message).toBe(
      'Too many requests. Please try again later.',
    );
    expect(snackBar.open).toHaveBeenCalledTimes(1);
  });

  it('should pass through a different error met while retrying', () => {
    http.get(URL).subscribe({ next, error });

    rejectWith429('1');
    vi.advanceTimersByTime(1000);
    controller
      .expectOne(URL)
      .flush(null, { status: 503, statusText: 'Unavailable' });

    expect(error).toHaveBeenCalledTimes(1);
    expect((error.mock.calls[0][0] as HttpErrorResponse).status).toBe(503);
    expect(snackBar.open).not.toHaveBeenCalled();
  });
});
