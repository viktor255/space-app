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
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface SpacecraftState extends EntityState<Spacecraft> {
  allSpacecraftsLoaded: boolean;
}

export const adapter: EntityAdapter<Spacecraft> = createEntityAdapter<Spacecraft>();

const initialSpacecraftState: SpacecraftState = adapter.getInitialState({
  allSpacecraftsLoaded: false
});

export interface AppState {
  spacecraftsState: SpacecraftState;
}

function spacecraftReducer(state: SpacecraftState = initialSpacecraftState, action: SpacecraftActions): SpacecraftState {
  switch (action.type) {
    case SpacecraftActionTypes.CreateAction: {
      return adapter.addOne(action.payload.spacecraft, state);
    }
    case SpacecraftActionTypes.DeleteAction: {
      return adapter.removeOne(action.payload.spacecraft.id, state);
    }
    case SpacecraftActionTypes.AllSpacecraftsLoaded: {
      return adapter.addAll(action.payload.spacecrafts, {...state, allSpacecraftsLoaded: true});
    }
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds
} = adapter.getSelectors();


export const reducers: ActionReducerMap<AppState> = {
  spacecraftsState: spacecraftReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
