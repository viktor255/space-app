import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { spacecraftReducer, SpacecraftState } from '../space/reducers/spacecrafts.reducers';


export interface AppState {
  spacecraftsState: SpacecraftState;
}


export const reducers: ActionReducerMap<AppState> = {
  spacecraftsState: spacecraftReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
