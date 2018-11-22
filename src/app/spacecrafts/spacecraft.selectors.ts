import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSpacecraft from '../reducers/index';

// export const selectSpacecraftState = state => state.spacecraftsState;
export const selectSpacecraftState = createFeatureSelector<fromSpacecraft.SpacecraftState>('spacecraftsState');

// export const selectSpacecraftById = (spacecraftId: string) => createSelector(
//   selectSpacecraftState,
//   spacecraftState => spacecraftState.entities[spacecraftId]
// );

export const selectAllSpacecrafts = createSelector(
  selectSpacecraftState,
  fromSpacecraft.selectAll
);

export const allSpacecraftsLoaded = createSelector(
  selectSpacecraftState,
  spacecraftState => spacecraftState.allSpacecraftsLoaded
);
