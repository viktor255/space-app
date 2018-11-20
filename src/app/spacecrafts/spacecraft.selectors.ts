import { createSelector } from '@ngrx/store';

export const selectSpacecraftState = state => state.spacecraftsState;


export const spacecrafts = createSelector(
  selectSpacecraftState,
  spacecraftsState => spacecraftsState.spacecrafts
);
