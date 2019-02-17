import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCosmonaut from '../reducers/cosmonauts.reducer';
import { Cosmonaut } from '../models/cosmonaut.model';

export const selectCosmonautState = createFeatureSelector<fromCosmonaut.CosmonautState>('cosmonautsState');

export const selectCosmonautById = (cosmonautId: string) => createSelector(
  selectCosmonautState,
  cosmonautState => cosmonautState.entities[cosmonautId]
);

export const selectAllCosmonauts = createSelector(
  selectCosmonautState,
  fromCosmonaut.selectAll
);

export const allCosmonautsLoaded = createSelector(
  selectCosmonautState,
  cosmonautState => cosmonautState.allCosmonautsLoaded
);

export const selectCosmonautsByIds = (cosmonautsIds: string[]) => createSelector(
  selectAllCosmonauts,
  allCosmonauts => allCosmonauts.filter((cosmonaut: Cosmonaut) => cosmonautsIds.includes(cosmonaut._id))
);
