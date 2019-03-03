import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { emailSelector, roleSelector } from '../../auth/auth.selector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
  private _userRoleSub: Subscription;
  public role: string;
  public role$: Observable<string>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.role$ = this.store.pipe(select(roleSelector));
    this._userRoleSub = this.role$.subscribe(role => {
        this.role = role;
      }
    );
  }
  ngOnDestroy() {
    this._userRoleSub.unsubscribe();
  }
}
