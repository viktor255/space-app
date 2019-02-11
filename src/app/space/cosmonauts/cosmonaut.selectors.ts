import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCosmonaut from '../reducers/cosmonauts.reducer';

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
