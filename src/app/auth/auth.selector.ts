import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.authState;

export const isLoggedIn = createSelector(
  selectAuthState,
  authState => authState.loggedIn
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

export const tokenSelector = createSelector(
  selectAuthState,
  authState => authState.user ? authState.user.token : undefined
);

export const emailSelector = createSelector(
  selectAuthState,
  authState => authState.user ? authState.user.email : undefined
);

