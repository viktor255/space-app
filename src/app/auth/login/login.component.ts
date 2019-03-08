import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login, ResendToken, ResetPasswordToken } from '../auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthData } from '../auth-data.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  onLogin(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    };

    this.store.dispatch(new Login({authData: authData}));
  }

  onResendToken(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: 'dummy'
    };

    this.store.dispatch(new ResendToken({authData: authData}));
  }

  onResetPassword(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: 'dummy'
    };

    this.store.dispatch(new ResetPasswordToken({authData: authData}));
  }


}
