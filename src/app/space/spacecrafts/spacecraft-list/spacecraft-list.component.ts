import { Component, OnInit } from '@angular/core';
import { Spacecraft } from '../../models/spacecraft.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Observable } from 'rxjs';
import { AllSpacecraftsRequested } from '../spacecraft.actions';
import { selectAllSpacecrafts } from '../spacecraft.selectors';

@Component({
  selector: 'app-spacecraft-list',
  templateUrl: './spacecraft-list.component.html'
})
export class SpacecraftListComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  spacecrafts$: Observable<Spacecraft[]>;

  ngOnInit() {
    this.store.dispatch(new AllSpacecraftsRequested());
    this.spacecrafts$ = this.store.pipe(select(selectAllSpacecrafts));
  }


}
