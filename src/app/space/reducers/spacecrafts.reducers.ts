import { Spacecraft } from '../models/spacecraft.model';
import { SpacecraftActions, SpacecraftActionTypes } from '../spacecrafts/spacecraft.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface SpacecraftState extends EntityState<Spacecraft> {
  allSpacecraftsLoaded: boolean;
}

export const adapter: EntityAdapter<Spacecraft> = createEntityAdapter<Spacecraft>({
  selectId: (spacecraft: Spacecraft) => spacecraft._id,
});

const initialSpacecraftState: SpacecraftState = adapter.getInitialState({
  allSpacecraftsLoaded: false
});

export function spacecraftReducer(state: SpacecraftState = initialSpacecraftState, action: SpacecraftActions): SpacecraftState {
  switch (action.type) {
    case SpacecraftActionTypes.CreateActionSuccessful: {
      return adapter.addOne(action.payload.spacecraft, state);
    }
    case SpacecraftActionTypes.DeleteActionSuccessful: {
      return adapter.removeOne(action.payload._id, state);
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



