import { Action } from '@ngrx/store';
import { Spaceflight } from '../models/spaceflight.model';

export enum SpaceflightActionTypes {
  CreateAction = '[Spaceflight Create] Create spaceflight action',
  CreateActionSuccessful = '[Spaceflight API] Spaceflight created successfully',
  DeleteAction = '[Spaceflight] Delete spaceflight action',
  DeleteActionSuccessful = '[Spaceflight API] Spaceflight deleted successfully',
  DestroyActionSuccessful = '[Spaceflight API] Spaceflight destroyed ',
  DestroyActionRequest = '[Spaceflight live] Spaceflight destroy request',
  UpdateAction = '[Spaceflight] Update spaceflight action',
  UpdateActionSuccessful = '[Spaceflight API] Spaceflight updated successfully',
  AllSpaceflightsRequested = '[Spaceflight-list] All spaceflights requested',
  AllSpaceflightsLoaded = '[Spaceflight API] All spaceflights loaded',
  BackendError = '[Spaceflight API] Backend returned error',
}

export class Create implements Action {
  readonly type = SpaceflightActionTypes.CreateAction;

  constructor(public readonly payload: { spaceflight: Spaceflight }) {
  }
}

export class CreateSuccessful implements Action {
  readonly type = SpaceflightActionTypes.CreateActionSuccessful;

  constructor(public readonly payload: { spaceflight: Spaceflight }) {
  }
}

export class Delete implements Action {
  readonly type = SpaceflightActionTypes.DeleteAction;

  constructor(public readonly payload: { _id: string }) {
  }
}

export class DeleteSuccessful implements Action {
  readonly type = SpaceflightActionTypes.DeleteActionSuccessful;

  constructor(public readonly payload: { _id: string }) {
  }
}

export class DestroySuccessful implements Action {
  readonly type = SpaceflightActionTypes.DestroyActionSuccessful;

  constructor(public readonly payload: { _id: string }) {
  }
}

export class DestroyRequest implements Action {
  readonly type = SpaceflightActionTypes.DestroyActionRequest;

  constructor(public readonly payload: { _id: string }) {
  }
}

export class Update implements Action {
  readonly type = SpaceflightActionTypes.UpdateAction;

  constructor(public readonly payload: { spaceflight: Spaceflight }) {
  }
}

export class UpdateSuccessful implements Action {
  readonly type = SpaceflightActionTypes.UpdateActionSuccessful;

  constructor(public readonly payload: { spaceflight: Spaceflight }) {
  }
}

export class AllSpaceflightsRequested implements Action {
  readonly type = SpaceflightActionTypes.AllSpaceflightsRequested;
}

export class AllSpaceflightsLoaded implements Action {
  readonly type = SpaceflightActionTypes.AllSpaceflightsLoaded;

  constructor(public readonly payload: { spaceflights: Spaceflight[] }) {
  }
}

export class BackendError implements Action {
  readonly type = SpaceflightActionTypes.BackendError;

  constructor(public readonly payload: { error: Error }) {
  }
}

export type SpaceflightActions =
  Create
  | Delete
  | Update
  | AllSpaceflightsRequested
  | AllSpaceflightsLoaded
  | CreateSuccessful
  | DeleteSuccessful
  | UpdateSuccessful
  | DestroyRequest
  | DeleteSuccessful
  | BackendError;
