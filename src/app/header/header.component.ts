import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoggedIn, roleSelector } from '../auth/auth.selector';
import { Logout } from '../auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn$: Observable<boolean>;
  public role$: Observable<string>;
  public _roleSub: Subscription;
  public role: string;


  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.role$ = this.store.pipe(select(roleSelector));
    this._roleSub = this.role$.subscribe(role => this.role = role);
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  ngOnDestroy() {
    this._roleSub.unsubscribe();
  }


}
