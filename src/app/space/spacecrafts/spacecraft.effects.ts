import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AllSpacecraftsLoaded, AllSpacecraftsRequested, SpacecraftActionTypes } from './spacecraft.actions';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Spacecraft } from '../models/spacecraft.model';
import { AppState } from '../../reducers/index';
import { select, Store } from '@ngrx/store';
import { allSpacecraftsLoaded } from './spacecraft.selectors';

@Injectable()
export class SpacecraftEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<AppState>) {
  }

  @Effect()
  loadSpacecrafts$ = this.actions$
    .pipe(
      ofType<AllSpacecraftsRequested>(SpacecraftActionTypes.AllSpacecraftsRequested),
      withLatestFrom(this.store.pipe(select(allSpacecraftsLoaded))),
      filter(([action, allSpacecraftsLoadedBool]) => !allSpacecraftsLoadedBool),
      mergeMap((action) => this.getSpacecrafts()),
      map(spacecraftObject => new AllSpacecraftsLoaded({spacecrafts: spacecraftObject.spacecrafts}))
    );

  getSpacecrafts() {
    return this.httpClient.get<{ message: string, spacecrafts: Spacecraft[] }>('http://localhost:3000/api/spacecrafts');
  }


}
