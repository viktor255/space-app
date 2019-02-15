import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AllSpaceflightsLoaded, AllSpaceflightsRequested, BackendError, SpaceflightActionTypes } from './spaceflight.actions';
import { Spaceflight } from '../models/spaceflight.model';
import { allSpaceflightsLoaded } from './spaceflight.selectors';

const BACKEND_URL = environment.apiUrl + '/spaceflights/';

@Injectable()
export class SpaceflightEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<AppState>) {
  }

  @Effect()
  loadSpaceflights$ = this.actions$
    .pipe(
      ofType<AllSpaceflightsRequested>(SpaceflightActionTypes.AllSpaceflightsRequested),
      withLatestFrom(this.store.pipe(select(allSpaceflightsLoaded))),
      filter(([action, allSpaceflightsLoadedBool]) => !allSpaceflightsLoadedBool),
      mergeMap((action) => this.getSpaceflights()
        .pipe(
          map(spaceflightObject => {
            return new AllSpaceflightsLoaded({spaceflights: spaceflightObject.spaceflights});
          }),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );


  getSpaceflights() {
    return this.httpClient.get<{ message: string, spaceflights: Spaceflight[] }>(BACKEND_URL);
  }


}
