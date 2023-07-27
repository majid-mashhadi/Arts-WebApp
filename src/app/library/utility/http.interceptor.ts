import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
// MySql2023
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service.
    const authToken = this.authService.getAccessToken()!;
    const headers = authToken
      ? request.headers.set('Authorization', `Bearer ${authToken}`)
      : request.headers;

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = request.clone({
      headers,
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          return this.handleUnauthorizedError(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }
  private handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        // If token refresh is successful, clone the original request with new token and resend
        const clonedRequest = this.addTokenToRequest(request);
        return next.handle(clonedRequest);
      }),
      catchError((error) => {
        // If token refresh fails, you can handle the error accordingly
        // For example, logout the user or redirect to the login page
        return throwError(error);
      })
    );
  }
  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    // Add the refreshed token to the request headers
    const token = this.authService.getAccessToken();
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
