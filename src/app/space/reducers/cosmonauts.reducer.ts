import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Cosmonaut } from '../models/cosmonaut.model';
import { CosmonautActions, CosmonautActionTypes } from '../cosmonauts/cosmonaut.actions';

export interface CosmonautState extends EntityState<Cosmonaut> {
  allCosmonautsLoaded: boolean;
}

export const adapter: EntityAdapter<Cosmonaut> = createEntityAdapter<Cosmonaut>({
  selectId: (cosmonaut: Cosmonaut) => cosmonaut._id,
});

const initialCosmonautState: CosmonautState = adapter.getInitialState({
  allCosmonautsLoaded: false
});

export function cosmonautReducer(state: CosmonautState = initialCosmonautState, action: CosmonautActions): CosmonautState {
  switch (action.type) {
    case CosmonautActionTypes.CreateActionSuccessful: {
      return adapter.addOne(action.payload.cosmonaut, state);
    }
    case CosmonautActionTypes.DeleteActionSuccessful: {
      return adapter.removeOne(action.payload._id, state);
    }
    case CosmonautActionTypes.UpdateActionSuccessful: {
      return adapter.updateOne({id: action.payload.cosmonaut._id, changes: action.payload.cosmonaut}, state);
    }
    case CosmonautActionTypes.AllCosmonautsLoaded: {
      return adapter.addAll(action.payload.cosmonauts, {...state, allCosmonautsLoaded: true});
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
