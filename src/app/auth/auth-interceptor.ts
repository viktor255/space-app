import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { tokenSelector } from './auth.selector';
import { first, flatMap, map, mergeMap, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.pipe(
      select(tokenSelector),
      first(),
      flatMap(token => {
        const authReq = !!token ? req.clone({
          setHeaders: {Authorization: 'Bearer ' + token},
        }) : req;
        return next.handle(authReq);
      }),
    );
  }
}
