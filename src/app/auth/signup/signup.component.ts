import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Signup } from '../auth.actions';
import { AuthData } from '../auth-data.model';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;

  constructor(private store: Store<AppState>) {
  }

  onSignup(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    };

    this.store.dispatch(new Signup({authData: authData}));

  }

}
