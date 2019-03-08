
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Spaceflight } from '../models/spaceflight.model';
import { SpaceflightActions, SpaceflightActionTypes } from '../spaceflights/spaceflight.actions';

export interface SpaceflightState extends EntityState<Spaceflight> {
  allSpaceflightsLoaded: boolean;
}

export const adapter: EntityAdapter<Spaceflight> = createEntityAdapter<Spaceflight>({
  selectId: (spaceflight: Spaceflight) => spaceflight._id,
});

const initialSpaceflightState: SpaceflightState = adapter.getInitialState({
  allSpaceflightsLoaded: false
});

export function spaceflightReducer(state: SpaceflightState = initialSpaceflightState, action: SpaceflightActions): SpaceflightState {
  switch (action.type) {
    case SpaceflightActionTypes.CreateActionSuccessful: {
      return adapter.addOne(action.payload.spaceflight, state);
    }
    case SpaceflightActionTypes.DeleteActionSuccessful: {
      return adapter.removeOne(action.payload._id, state);
    }
    case SpaceflightActionTypes.DestroyActionSuccessful: {
      return adapter.removeOne(action.payload._id, state);
    }
    case SpaceflightActionTypes.UpdateActionSuccessful: {
      return adapter.updateOne({id: action.payload.spaceflight._id, changes: action.payload.spaceflight}, state);
    }
    case SpaceflightActionTypes.AllSpaceflightsLoaded: {
      return adapter.addAll(action.payload.spaceflights, {...state, allSpaceflightsLoaded: true});
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



