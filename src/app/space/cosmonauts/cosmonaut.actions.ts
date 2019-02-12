import { Action } from '@ngrx/store';
import { Cosmonaut } from '../models/cosmonaut.model';

export enum CosmonautActionTypes {
  CreateAction = '[Cosmonaut Create] Create cosmonaut action',
  CreateActionSuccessful = '[Cosmonaut API] Cosmonaut created successfully',
  DeleteAction = '[Cosmonaut] Delete cosmonaut action',
  DeleteActionSuccessful = '[Cosmonaut API] Cosmonaut deleted successfully',
  UpdateAction = '[Cosmonaut] Update cosmonaut action',
  UpdateActionSuccessful = '[Cosmonaut API] Cosmonaut updated successfully',
  AllCosmonautsRequested = '[Cosmonaut-list] All cosmonauts requested',
  AllCosmonautsLoaded = '[Cosmonaut API] All cosmonauts loaded',
  BackendError = '[Cosmonaut API] Backend returned error',
}

export class Create implements Action {
  readonly type = CosmonautActionTypes.CreateAction;

  constructor(public readonly payload: { cosmonaut: Cosmonaut }) {
  }
}

export class CreateSuccessful implements Action {
  readonly type = CosmonautActionTypes.CreateActionSuccessful;

  constructor(public readonly payload: { cosmonaut: Cosmonaut }) {
  }
}

export class Delete implements Action {
  readonly type = CosmonautActionTypes.DeleteAction;

  constructor(public readonly payload: { _id: string }) {
  }
}

export class DeleteSuccessful implements Action {
  readonly type = CosmonautActionTypes.DeleteActionSuccessful;

  constructor(public readonly payload: { _id: string }) {
  }
}

export class Update implements Action {
  readonly type = CosmonautActionTypes.UpdateAction;

  constructor(public readonly payload: { cosmonaut: Cosmonaut }) {
  }
}

export class UpdateSuccessful implements Action {
  readonly type = CosmonautActionTypes.UpdateActionSuccessful;

  constructor(public readonly payload: { cosmonaut: Cosmonaut }) {
  }
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
  Create
  | Delete
  | Update
  | CreateSuccessful
  | DeleteSuccessful
  | UpdateSuccessful
  | AllCosmonautsRequested
  | AllCosmonautsLoaded
  | BackendError;
