import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authToken = '1234567890';

  constructor() {}

  // wird für jeden http request automatisch aufgerufen.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`
      }
    });
    return next.handle(newRequest);
  }
}
