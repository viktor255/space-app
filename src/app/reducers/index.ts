import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { spacecraftReducer, SpacecraftState } from '../space/reducers/spacecrafts.reducer';
import { authReducer, AuthState } from '../auth/auth.reducer';
import { cosmonautReducer, CosmonautState } from '../space/reducers/cosmonauts.reducer';
import { spaceflightReducer, SpaceflightState } from '../space/reducers/spaceflights.reducer';


export interface AppState {
  spacecraftsState: SpacecraftState;
  cosmonautsState: CosmonautState;
  spaceflightState: SpaceflightState;
  authState: AuthState;
}


export const reducers: ActionReducerMap<AppState> = {
  spacecraftsState: spacecraftReducer,
  cosmonautsState: cosmonautReducer,
  spaceflightState: spaceflightReducer,
  authState: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
