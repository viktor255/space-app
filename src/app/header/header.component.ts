import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoggedIn, roleSelector } from '../auth/auth.selector';
import { Logout } from '../auth/auth.actions';
import { SpaceflightsService } from '../space/spaceflights/services/spaceflights.service';
import { DestroyRequest, DestroySuccessful } from '../space/spaceflights/spaceflight.actions';

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


  constructor(private store: Store<AppState>, private spaceflightsService: SpaceflightsService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.role$ = this.store.pipe(select(roleSelector));
    this._roleSub = this.role$.subscribe(role => this.role = role);
    this.spaceflightsService.spaceflightDestructionStarted$.subscribe(spaceflightId => {
      this.store.dispatch(new DestroyRequest({_id: spaceflightId}));
    });
    this.spaceflightsService.spaceflightDestroyed$.subscribe(spaceflightId => {
      this.store.dispatch(new DestroySuccessful({_id: spaceflightId}));
    });
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  ngOnDestroy() {
    this._roleSub.unsubscribe();
  }


}
