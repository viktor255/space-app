import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AllCosmonautsLoaded,
  AllCosmonautsRequested,
  BackendError,
  CosmonautActionTypes,
  Create,
  CreateSuccessful, Delete, DeleteSuccessful, Update, UpdateSuccessful
} from './cosmonaut.actions';
import { allCosmonautsLoaded } from './cosmonaut.selectors';
import { Cosmonaut } from '../models/cosmonaut.model';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { MatSnackBar } from '@angular/material';

const BACKEND_URL = environment.apiUrl + '/cosmonauts/';

@Injectable()
export class CosmonautEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<AppState>, private snackBar: MatSnackBar) {
  }

  @Effect()
  loadCosmonauts$ = this.actions$
    .pipe(
      ofType<AllCosmonautsRequested>(CosmonautActionTypes.AllCosmonautsRequested),
      withLatestFrom(this.store.pipe(select(allCosmonautsLoaded))),
      filter(([action, allCosmonautsLoadedBool]) => !allCosmonautsLoadedBool),
      mergeMap((action) => this.getCosmonauts()
        .pipe(
          map(CosmonautObject => new AllCosmonautsLoaded({cosmonauts: CosmonautObject.cosmonauts})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );

  @Effect()
  createCosmonaut$ = this.actions$
    .pipe(
      ofType<Create>(CosmonautActionTypes.CreateAction),
      mergeMap((action) => this.createCosmonaut(action.payload.cosmonaut)
        .pipe(
          map((cosmonautJSON: { cosmonaut: Cosmonaut }) => new CreateSuccessful({cosmonaut: cosmonautJSON.cosmonaut})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      )
    );
  @Effect({dispatch: false})
  createCosmonautSuccessful$ = this.actions$
    .pipe(
      ofType<CreateSuccessful>(CosmonautActionTypes.CreateActionSuccessful),
      tap((action) => {
        const message = 'Cosmonaut: ' + action.payload.cosmonaut.name + ' created';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );

  @Effect()
  updateCosmonaut$ = this.actions$
    .pipe(
      ofType<Update>(CosmonautActionTypes.UpdateAction),
      mergeMap((action) => this.updateCosmonaut(action.payload.cosmonaut)
        .pipe(
          map(() => new UpdateSuccessful({cosmonaut: action.payload.cosmonaut})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  updateCosmonautSuccessful$ = this.actions$
    .pipe(
      ofType<UpdateSuccessful>(CosmonautActionTypes.UpdateActionSuccessful),
      tap((action) => {
        const message = 'Cosmonaut: ' + action.payload.cosmonaut.name + ' updated';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );

  @Effect()
  deleteCosmonaut$ = this.actions$
    .pipe(
      ofType<Delete>(CosmonautActionTypes.DeleteAction),
      mergeMap((action) => this.deleteCosmonaut(action.payload._id)
        .pipe(
          map((idJSON: { _id: string }) => new DeleteSuccessful({_id: idJSON._id})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  deleteCosmonautSuccessful$ = this.actions$
    .pipe(
      ofType<DeleteSuccessful>(CosmonautActionTypes.DeleteActionSuccessful),
      tap((action) => {
        const message = 'Cosmonaut deleted';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );


  getCosmonauts() {
    return this.httpClient.get<{ message: string, cosmonauts: Cosmonaut[] }>(BACKEND_URL);
  }

  createCosmonaut(cosmonaut: Cosmonaut) {
    return this.httpClient.post(BACKEND_URL, cosmonaut);
  }

  updateCosmonaut(cosmonaut: Cosmonaut) {
    return this.httpClient.put(BACKEND_URL + cosmonaut._id, cosmonaut);
  }

  deleteCosmonaut(id: string) {
    return this.httpClient.delete(BACKEND_URL + id);
  }


}
