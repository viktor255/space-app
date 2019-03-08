import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSpaceflight from '../reducers/spaceflights.reducer';

export const selectSpaceflightState = createFeatureSelector<fromSpaceflight.SpaceflightState>('spaceflightState');

export const selectSpaceflightById = (spaceflightId: string) => createSelector(
  selectSpaceflightState,
  spaceflightState => spaceflightState.entities[spaceflightId]
);

export const selectAllSpaceflights = createSelector(
  selectSpaceflightState,
  fromSpaceflight.selectAll
);

export const selectCosmonautsSpaceflights = (cosmonautId: string) => createSelector(
  selectAllSpaceflights,
  spaceflights => spaceflights.filter(spaceflight => spaceflight.cosmonautsIds.includes(cosmonautId))
);

export const allSpaceflightsLoaded = createSelector(
  selectSpaceflightState,
  spaceflightState => spaceflightState.allSpaceflightsLoaded
);
