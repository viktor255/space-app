import { Action } from '@ngrx/store';
import { Cosmonaut } from '../models/cosmonaut.model';

export enum CosmonautActionTypes {
  AllCosmonautsRequested = '[Cosmonaut-list] All cosmonauts requested',
  AllCosmonautsLoaded = '[Cosmonaut API] All cosmonauts loaded',
  BackendError = '[Cosmonaut API] Backend returned error',
}


export class AllCosmonautsRequested implements Action {
  readonly type = CosmonautActionTypes.AllCosmonautsRequested;
}

export class AllCosmonautsLoaded implements Action {
  readonly type = CosmonautActionTypes.AllCosmonautsLoaded;

  constructor(public readonly payload: { cosmonauts: Cosmonaut[] }) {
  }
}

export class BackendError implements Action {
  readonly type = CosmonautActionTypes.BackendError;

  constructor(public readonly payload: { error: Error }) {
  }
}

export type CosmonautActions =
  AllCosmonautsRequested
  | AllCosmonautsLoaded
  | BackendError;
