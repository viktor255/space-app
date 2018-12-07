import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthData } from '../auth-data.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  token: string;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    }, {validator: this.matchPassword});
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onResetPassword() {
    console.log(this.form.value);
    const authData: AuthData = {
      email: 'dummy',
      password: this.form.value.password
    };
    console.log(authData);
    console.log(this.token);

    this.store.dispatch(new ResetPassword({authData: authData, token: this.token}));
  }

  matchPassword(group): any {
    const password = group.controls.password;
    const confirm = group.controls.confirm;
    if (password.pristine || confirm.pristine) {
      return null;
    }
    group.markAsTouched();
    if (password.value === confirm.value) {
      return null;
    }
    return {
      invalidPassword: true
    };
  }


}

