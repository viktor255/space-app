import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AllSpacecraftsLoaded,
  AllSpacecraftsRequested, BackendError,
  Create,
  CreateSuccessful,
  Delete, DeleteSuccessful,
  SpacecraftActionTypes, Update, UpdateSuccessful
} from './spacecraft.actions';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Spacecraft } from '../models/spacecraft.model';
import { AppState } from '../../reducers/index';
import { select, Store } from '@ngrx/store';
import { allSpacecraftsLoaded } from './spacecraft.selectors';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/spacecrafts/';

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
      mergeMap((action) => this.getSpacecrafts()
        .pipe(
          map(spacecraftObject => new AllSpacecraftsLoaded({spacecrafts: spacecraftObject.spacecrafts})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );

  @Effect()
  createSpacecraft$ = this.actions$
    .pipe(
      ofType<Create>(SpacecraftActionTypes.CreateAction),
      mergeMap((action) => this.createSpacecraft(action.payload.spacecraft)
        .pipe(
          map((spacecraftJSON: { spacecraft: Spacecraft }) => new CreateSuccessful({spacecraft: spacecraftJSON.spacecraft})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );

  @Effect()
  deleteSpacecraft$ = this.actions$
    .pipe(
      ofType<Delete>(SpacecraftActionTypes.DeleteAction),
      mergeMap((action) => this.deleteSpacecraft(action.payload._id)
        .pipe(
          map((idJSON: { _id: string }) => new DeleteSuccessful({_id: idJSON._id})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );

  @Effect()
  updateSpacecraft$ = this.actions$
    .pipe(
      ofType<Update>(SpacecraftActionTypes.UpdateAction),
      mergeMap((action) => this.updateSpacecraft(action.payload.spacecraft)
        .pipe(
          map((spacecraftJSON: { spacecraft: Spacecraft }) => new UpdateSuccessful({spacecraft: spacecraftJSON.spacecraft})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );


  getSpacecrafts() {
    return this.httpClient.get<{ message: string, spacecrafts: Spacecraft[] }>(BACKEND_URL);
  }

  createSpacecraft(spacecraft: Spacecraft) {
    return this.httpClient.post(BACKEND_URL, spacecraft);
  }

  updateSpacecraft(spacecraft: Spacecraft) {
    return this.httpClient.put(BACKEND_URL + spacecraft._id, spacecraft);
  }

  deleteSpacecraft(id: string) {
    return this.httpClient.delete(BACKEND_URL + id);
  }


}
