import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Spacecraft } from '../models/spacecraft.model';
import { SpacecraftActions, SpacecraftActionTypes } from '../spacecrafts/spacecraft.actions';
import { storeFreeze } from 'ngrx-store-freeze';

type SpacecraftState = {
  spacecrafts: Spacecraft[];
};

const initialSpacecraftState: SpacecraftState = {
  spacecrafts: []
};

export interface AppState {
  spacecraftsState: SpacecraftState;
}

function spacecraftReducer(state: SpacecraftState = initialSpacecraftState, action: SpacecraftActions): SpacecraftState {
  switch (action.type) {
    case SpacecraftActionTypes.CreateAction: {
      return {
        spacecrafts: [...state.spacecrafts, action.payload.spacecraft]
      };
    }
    case SpacecraftActionTypes.DeleteAction: {
      return {
        spacecrafts: state.spacecrafts
          .filter(spacecraft => action.payload.spacecraft !== spacecraft)
      };
    }
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  spacecraftsState: spacecraftReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
