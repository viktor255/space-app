import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  Login,
  LoginError,
  LoginSuccessful,
  Logout,
  ResendToken,
  ResendTokenError,
  ResendTokenSuccessful,
  ResetPassword,
  ResetPasswordError,
  ResetPasswordSuccessful,
  ResetPasswordToken, ResetPasswordTokenError,
  ResetPasswordTokenSuccessful,
  Signup,
  SignupError,
  SignupSuccessful
} from './auth.actions';
import { User } from '../models/user.model';
import { defer, of } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

const BACKEND_URL = environment.apiUrl + '/auth/';


@Injectable()
export class AuthEffects {
  private tokenTimer: any;

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<AppState>,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  @Effect()
  init$ = defer((): any => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const currentUser: User = JSON.parse(userData);
      const expiresIn = currentUser.expiresIn - Date.now();
      if (expiresIn > 0) {
        this.setAuthTimer(expiresIn / 1000);
        return of(new LoginSuccessful({user: currentUser}));
      } else {
        return of(new Logout());
      }
    } else {
      return of(new Logout());
    }
  });


  @Effect({dispatch: false})
  loginSuccessful$ = this.actions$
    .pipe(
      ofType<LoginSuccessful>(AuthActionTypes.LoginActionSuccessful),
      tap((action) => {
        const expiresIn = action.payload.user.expiresIn - Date.now();
        this.setAuthTimer(expiresIn / 1000);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        this.router.navigateByUrl('/');
      })
    );

  @Effect({dispatch: false})
  logout$ = this.actions$
    .pipe(
      ofType<Logout>(AuthActionTypes.LogoutAction),
      tap(() => {
        localStorage.removeItem('user');
        const message = 'Logged out';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
        this.router.navigateByUrl('/login');
      })
    );

  @Effect()
  signupUser$ = this.actions$
    .pipe(
      ofType<Signup>(AuthActionTypes.SignupAction),
      switchMap((action) => this.signupUser(action.payload.authData)
        .pipe(
          map(() => new SignupSuccessful()),
          catchError((error) => {
            this.store.dispatch(new SignupError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  signupSuccessful$ = this.actions$
    .pipe(
      ofType<SignupSuccessful>(AuthActionTypes.SignupActionSuccessful),
      tap(() => {
        const message = 'User created';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
        this.router.navigateByUrl('/login');
      })
    );

  @Effect()
  loginUser$ = this.actions$
    .pipe(
      ofType<Login>(AuthActionTypes.LoginAction),
      switchMap((action) => this.loginUser(action.payload.authData)
        .pipe(
          map((serverJSON: { user: User }) => new LoginSuccessful({
            user: serverJSON.user
          })),
          catchError((error) => {
            this.store.dispatch(new LoginError({error: error}));
            return of();
          })
        )
      ),
    );

  @Effect()
  resetPasswordToken$ = this.actions$
    .pipe(
      ofType<ResetPasswordToken>(AuthActionTypes.ResetPasswordTokenAction),
      switchMap((action) => this.resetPasswordToken(action.payload.authData)
        .pipe(
          map(() => new ResetPasswordTokenSuccessful({email: action.payload.authData.email})),
          catchError((error) => {
            this.store.dispatch(new ResetPasswordTokenError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  resetPasswordTokenSuccessful$ = this.actions$
    .pipe(
      ofType<ResetPasswordTokenSuccessful>(AuthActionTypes.ResetPasswordTokenSuccessful),
      tap((action) => {
        const message = 'Email with instruction was send to: ' + action.payload.email;
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );

  @Effect()
  resetPassword$ = this.actions$
    .pipe(
      ofType<ResetPassword>(AuthActionTypes.ResetPasswordAction),
      switchMap((action) => this.resetPassword(action.payload.authData, action.payload.token)
        .pipe(
          map(() => new ResetPasswordSuccessful()),
          catchError((error) => {
            this.store.dispatch(new ResetPasswordError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  resetPasswordSuccessful$ = this.actions$
    .pipe(
      ofType<ResetPasswordSuccessful>(AuthActionTypes.ResetPasswordSuccessful),
      tap(() => {
        const message = 'Password was changed';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
        this.router.navigateByUrl('/login');
      })
    );

  @Effect()
  resendToken$ = this.actions$
    .pipe(
      ofType<ResendToken>(AuthActionTypes.ResendTokenAction),
      switchMap((action) => this.resendToken(action.payload.authData)
        .pipe(
          map(() => new ResendTokenSuccessful({email: action.payload.authData.email})),
          catchError((error) => {
            this.store.dispatch(new ResendTokenError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  resendTokenSuccessful$ = this.actions$
    .pipe(
      ofType<ResendTokenSuccessful>(AuthActionTypes.ResendTokenSuccessful),
      tap((action) => {
        const message = 'Authentication token was send to: ' + action.payload.email;
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.store.dispatch(new Logout());
    }, duration * 1000);
  }

  signupUser(authData: AuthData) {
    return this.httpClient.post(BACKEND_URL + 'signup', authData);
  }

  loginUser(authData: AuthData) {
    return this.httpClient.post(BACKEND_URL + 'login', authData);
  }

  resendToken(authData: AuthData) {
    return this.httpClient.post(BACKEND_URL + 'resend', authData);
  }

  resetPasswordToken(authData: AuthData) {
    return this.httpClient.post(BACKEND_URL + 'sendResetPasswordToken', authData);
  }

  resetPassword(authData: AuthData, token: string) {
    return this.httpClient.post(BACKEND_URL + 'changePassword', {password: authData.password, token: token});
  }

}
