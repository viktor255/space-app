import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthData } from '../auth-data.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;

  constructor(private store: Store<AppState>) {
  }

  onLogin(form: NgForm) {
    console.log(form.value);
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    };

    this.store.dispatch(new Login({authData: authData}));
  }


}
