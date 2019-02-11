import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Cosmonaut } from '../models/cosmonaut.model';
import { CosmonautActions } from '../cosmonauts/cosmonaut.actions';

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
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds
} = adapter.getSelectors();
