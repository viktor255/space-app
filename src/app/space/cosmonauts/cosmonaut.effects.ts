import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AllCosmonautsLoaded, AllCosmonautsRequested, BackendError, CosmonautActionTypes } from './cosmonaut.actions';
import { allCosmonautsLoaded } from './cosmonaut.selectors';
import { Cosmonaut } from '../models/cosmonaut.model';

const BACKEND_URL = environment.apiUrl + '/cosmonauts/';

@Injectable()
export class CosmonautEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<AppState>) {
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






  getCosmonauts() {
    return this.httpClient.get<{ message: string, cosmonauts: Cosmonaut[] }>('http://localhost:3000/api/cosmonauts');
  }





}
