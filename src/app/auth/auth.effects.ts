import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthActionTypes, Login, LoginError, LoginSuccessful, Signup, SignupError, SignupSuccessful } from './auth.actions';
import { User } from '../models/user.model';
import { of } from 'rxjs';
import { AuthData } from './auth-data.model';


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<AppState>) {
  }

  @Effect()
  signupUser$ = this.actions$
    .pipe(
      ofType<Signup>(AuthActionTypes.SignupAction),
      switchMap((action) => this.signupUser(action.payload.authData)
        .pipe(
          map((sometig) => new SignupSuccessful()),
          catchError((error) => {
            this.store.dispatch(new SignupError({error: error}));
            return of();
          })
        )
      ),
    );

  @Effect()
  loginUser$ = this.actions$
    .pipe(
      ofType<Login>(AuthActionTypes.LoginAction),
      switchMap((action) => this.loginUser(action.payload.authData).pipe(
        map((serverJSON: { user: User }) => new LoginSuccessful({
          user: serverJSON.user
        })),
        catchError((error) => {
          this.store.dispatch(new LoginError({error: error}));
          return of();
        })
      )),
    );

  signupUser(authData: AuthData) {
    return this.httpClient.post('http://localhost:3000/api/auth/signup', authData);
  }

  loginUser(authData: AuthData) {
    return this.httpClient.post('http://localhost:3000/api/auth/login', authData);
  }

}
