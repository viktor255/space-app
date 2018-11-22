import { Action } from '@ngrx/store';
import { Spacecraft } from '../models/spacecraft.model';

export enum SpacecraftActionTypes {
  CreateAction = '[Spacecraft Create] create spacecraft action',
  DeleteAction = '[Spacecraft] delete spacecraft action',
  AllSpacecraftsRequested = '[Spacecraft-list] All spacecrafts requested',
  AllSpacecraftsLoaded = '[Spacecraft API] All spacecrafts loaded',
}

export class Create implements Action {
  readonly type = SpacecraftActionTypes.CreateAction;
  constructor(public readonly payload: {spacecraft: Spacecraft}) {}
}
export class Delete implements Action {
  readonly type = SpacecraftActionTypes.DeleteAction;
  constructor(public readonly payload: {spacecraft: Spacecraft}) {}
}
export class AllSpacecraftsRequested implements Action {
  readonly type = SpacecraftActionTypes.AllSpacecraftsRequested;
}
export class AllSpacecraftsLoaded implements Action {
  readonly type = SpacecraftActionTypes.AllSpacecraftsLoaded;
  constructor(public readonly payload: {spacecrafts: Spacecraft[]}) {}
}

export type SpacecraftActions = Create | Delete | AllSpacecraftsRequested| AllSpacecraftsLoaded;
