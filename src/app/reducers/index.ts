import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { spacecraftReducer, SpacecraftState } from '../space/reducers/spacecrafts.reducers';
import { authReducer, AuthState } from '../auth/auth.reducer';


export interface AppState {
  spacecraftsState: SpacecraftState;
  authState: AuthState;
}


export const reducers: ActionReducerMap<AppState> = {
  spacecraftsState: spacecraftReducer,
  authState: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
