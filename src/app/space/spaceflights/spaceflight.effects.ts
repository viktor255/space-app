import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AllSpaceflightsLoaded,
  AllSpaceflightsRequested,
  BackendError, Create,
  CreateSuccessful, Delete, DeleteSuccessful, DestroyRequest, DestroySuccessful,
  SpaceflightActionTypes, Update, UpdateSuccessful
} from './spaceflight.actions';
import { Spaceflight } from '../models/spaceflight.model';
import { allSpaceflightsLoaded } from './spaceflight.selectors';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DestructionWarningComponent } from '../destruction-warning/destruction-warning.component';

const BACKEND_URL = environment.apiUrl + '/spaceflights/';

@Injectable()
export class SpaceflightEffects {

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
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

  @Effect()
  createSpaceflight$ = this.actions$
    .pipe(
      ofType<Create>(SpaceflightActionTypes.CreateAction),
      mergeMap((action) => this.createSpaceflight(action.payload.spaceflight)
        .pipe(
          map((spaceflightJSON: { spaceflight: Spaceflight }) => new CreateSuccessful({spaceflight: spaceflightJSON.spaceflight})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  createSpaceflightSuccessful$ = this.actions$
    .pipe(
      ofType<CreateSuccessful>(SpaceflightActionTypes.CreateActionSuccessful),
      tap((action) => {
        const message = 'Spaceflight created';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );

  @Effect()
  deleteSpaceflight$ = this.actions$
    .pipe(
      ofType<Delete>(SpaceflightActionTypes.DeleteAction),
      mergeMap((action) => this.deleteSpaceflight(action.payload._id)
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
  deleteSpaceflightSuccessful$ = this.actions$
    .pipe(
      ofType<DeleteSuccessful>(SpaceflightActionTypes.DeleteActionSuccessful),
      tap((action) => {
        const message = 'Spaceflight deleted';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );

  @Effect({dispatch: false})
  destroySpaceflightRequest$ = this.actions$
    .pipe(
      ofType<DestroyRequest>(SpaceflightActionTypes.DestroyActionRequest),
      tap((action) => {
        this.dialog.open(DestructionWarningComponent, {data: {spaceflightId: action.payload._id}, panelClass: 'custom-dialog-container'});
      })
    );
  @Effect({dispatch: false})
  destroySpaceflightSuccesfull$ = this.actions$
    .pipe(
      ofType<DestroySuccessful>(SpaceflightActionTypes.DestroyActionSuccessful),
      tap((action) => {
        const message = 'Spaceflight destroyed';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );

  @Effect()
  updateSpaceflight$ = this.actions$
    .pipe(
      ofType<Update>(SpaceflightActionTypes.UpdateAction),
      mergeMap((action) => this.updateSpaceflight(action.payload.spaceflight)
        .pipe(
          map((spaceflightJSON: { spaceflight: Spaceflight }) => new UpdateSuccessful({spaceflight: spaceflightJSON.spaceflight})),
          catchError((error) => {
            this.store.dispatch(new BackendError({error: error}));
            return of();
          })
        )
      ),
    );
  @Effect({dispatch: false})
  updateSpaceflightSuccessful$ = this.actions$
    .pipe(
      ofType<UpdateSuccessful>(SpaceflightActionTypes.UpdateActionSuccessful),
      tap((action) => {
        const message = 'Spaceflight updated';
        this.snackBar.openFromComponent(ConfirmationComponent, {data: {message: message, action: 'Okay'}, duration: 3000});
      })
    );


  getSpaceflights() {
    return this.httpClient.get<{ message: string, spaceflights: Spaceflight[] }>(BACKEND_URL);
  }

  createSpaceflight(spaceflight: Spaceflight) {
    return this.httpClient.post(BACKEND_URL, spaceflight);
  }

  deleteSpaceflight(id: string) {
    return this.httpClient.delete(BACKEND_URL + id);
  }

  updateSpaceflight(spaceflight: Spaceflight) {
    return this.httpClient.put(BACKEND_URL + spaceflight._id, spaceflight);
  }


}
