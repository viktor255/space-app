import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Observable } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested } from '../spaceflight.actions';
import { selectAllSpaceflights } from '../spaceflight.selectors';

@Component({
  selector: 'app-spaceflight-list',
  templateUrl: './spaceflight-list.component.html'
})
export class SpaceflightListComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  spaceflights$: Observable<Spaceflight[]>;

  ngOnInit() {

    this.store.dispatch(new AllSpaceflightsRequested());
    this.spaceflights$ = this.store.pipe(select(selectAllSpaceflights));
  }


}
