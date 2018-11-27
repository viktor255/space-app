import { Action } from '@ngrx/store';
import { Spacecraft } from '../models/spacecraft.model';

export enum SpacecraftActionTypes {
  CreateAction = '[Spacecraft Create] Create spacecraft action',
  CreateActionSuccessful = '[Spacecraft API] Spacecraft created successfully',
  DeleteAction = '[Spacecraft] Delete spacecraft action',
  DeleteActionSuccessful = '[Spacecraft API] Spacecraft deleted successfully',
  UpdateAction = '[Spacecraft] Update spacecraft action',
  UpdateActionSuccessful = '[Spacecraft API] Spacecraft updated successfully',
  AllSpacecraftsRequested = '[Spacecraft-list] All spacecrafts requested',
  AllSpacecraftsLoaded = '[Spacecraft API] All spacecrafts loaded',
}

export class Create implements Action {
  readonly type = SpacecraftActionTypes.CreateAction;
  constructor(public readonly payload: {spacecraft: Spacecraft}) {}
}
export class CreateSuccessful implements Action {
  readonly type = SpacecraftActionTypes.CreateActionSuccessful;
  constructor(public readonly payload: {spacecraft: Spacecraft}) {}
}
export class Delete implements Action {
  readonly type = SpacecraftActionTypes.DeleteAction;
  constructor(public readonly payload: {_id: string}) {}
}
export class DeleteSuccessful implements Action {
  readonly type = SpacecraftActionTypes.DeleteActionSuccessful;
  constructor(public readonly payload: {_id: string}) {}
}
export class Update implements Action {
  readonly type = SpacecraftActionTypes.UpdateAction;
  constructor(public readonly payload: {spacecraft: Spacecraft}) {}
}
export class UpdateSuccessful implements Action {
  readonly type = SpacecraftActionTypes.UpdateActionSuccessful;
  constructor(public readonly payload: {spacecraft: Spacecraft}) {}
}
export class AllSpacecraftsRequested implements Action {
  readonly type = SpacecraftActionTypes.AllSpacecraftsRequested;
}
export class AllSpacecraftsLoaded implements Action {
  readonly type = SpacecraftActionTypes.AllSpacecraftsLoaded;
  constructor(public readonly payload: {spacecrafts: Spacecraft[]}) {}
}

export type SpacecraftActions = Create | Delete | Update | AllSpacecraftsRequested| AllSpacecraftsLoaded | CreateSuccessful | DeleteSuccessful | UpdateSuccessful;
