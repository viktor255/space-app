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

  LogoutAction = '[Logout] action',

  ResetPasswordAction = '[Login] Reset password action',
  ResetPasswordSuccessful = '[Auth API] Password reset successfully',
  ResetPasswordError = '[Auth API] Password reset was not',

  ResetPasswordTokenAction = '[Login] Password reset token action',
  ResetPasswordTokenSuccessful = '[Auth API] Password token send successfully',
  ResetPasswordTokenError = '[Auth API] Password token was not send',

  ResendTokenAction = '[Login] Resend token action',
  ResendTokenSuccessful = '[Auth API] Token was resend successfully',
  ResendTokenError = '[Auth API] Token was not resend',
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SignupAction;

  constructor(public readonly payload: { authData: AuthData }) {
  }
}

export class SignupSuccessful implements Action {
  readonly type = AuthActionTypes.SignupActionSuccessful;
}

export class SignupError implements Action {
  readonly type = AuthActionTypes.SignupActionError;

  constructor(public readonly payload: { error: Error }) {
  }
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public readonly payload: { authData: AuthData }) {
  }
}

export class LoginSuccessful implements Action {
  readonly type = AuthActionTypes.LoginActionSuccessful;

  constructor(public readonly payload: { user: User }) {
  }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginActionError;

  constructor(public readonly payload: { error: Error }) {
  }
}

export class ResetPassword implements Action {
  readonly type = AuthActionTypes.ResetPasswordAction;

  constructor(public readonly payload: { authData: AuthData, token: string }) {
  }
}

export class ResetPasswordSuccessful implements Action {
  readonly type = AuthActionTypes.ResetPasswordSuccessful;
}

export class ResetPasswordError implements Action {
  readonly type = AuthActionTypes.ResetPasswordError;

  constructor(public readonly payload: { error: Error }) {
  }
}

export class ResetPasswordToken implements Action {
  readonly type = AuthActionTypes.ResetPasswordTokenAction;

  constructor(public readonly payload: { authData: AuthData }) {
  }
}

export class ResetPasswordTokenSuccessful implements Action {
  readonly type = AuthActionTypes.ResetPasswordTokenSuccessful;
  constructor(public readonly payload: { email: string }) {
  }
}

export class ResetPasswordTokenError implements Action {
  readonly type = AuthActionTypes.ResetPasswordTokenError;

  constructor(public readonly payload: { error: Error }) {
  }
}

export class ResendToken implements Action {
  readonly type = AuthActionTypes.ResendTokenAction;

  constructor(public readonly payload: { authData: AuthData }) {
  }
}

export class ResendTokenSuccessful implements Action {
  readonly type = AuthActionTypes.ResendTokenSuccessful;
  constructor(public readonly payload: { email: string }) {
  }
}

export class ResendTokenError implements Action {
  readonly type = AuthActionTypes.ResendTokenError;

  constructor(public readonly payload: { error: Error }) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions =
  Signup
  | SignupSuccessful
  | SignupError
  | Login
  | LoginSuccessful
  | LoginError
  | ResetPassword
  | ResetPasswordSuccessful
  | ResetPasswordError
  | ResetPasswordToken
  | ResetPasswordTokenSuccessful
  | ResetPasswordTokenError
  | ResendToken
  | ResendTokenSuccessful
  | ResendTokenError
  | Logout;
