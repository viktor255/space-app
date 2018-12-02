import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import { AuthData } from './auth-data.model';

export enum AuthActionTypes {
  SignupAction = '[Signup] action',
  SignupActionSuccessful = '[Auth API] User created successfully',
  SignupActionError = '[Auth API] Signup error',
  LoginAction = '[Login] action',
  LoginActionSuccessful = '[Auth API] User logged successfully',
  LoginActionError = '[Auth API] User was not logged',
  LogoutAction = '[Logout] action'
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SignupAction;
  constructor(public readonly payload: {authData: AuthData}) {}
}

export class SignupSuccessful implements Action {
  readonly type = AuthActionTypes.SignupActionSuccessful;
}

export class SignupError implements Action {
  readonly type = AuthActionTypes.SignupActionError;
  constructor(public readonly payload: {error: Error}) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public readonly payload: {authData: AuthData}) {}
}

export class LoginSuccessful implements Action {
  readonly type = AuthActionTypes.LoginActionSuccessful;
  constructor(public readonly payload: {user: User}) {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginActionError;
  constructor(public readonly payload: {error: Error}) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = Signup | SignupSuccessful | SignupError | Login | LoginSuccessful | LoginError | Logout;
