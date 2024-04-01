import { createReducer, on, Action } from '@ngrx/store';
import { setSourceDetailsLoadingState } from './app.actions';
import { SourceCredentials } from './models/ProjectSource';
import { LoadingStates } from './app-states';

export const initialState = {
  saveCredetialsLoadingState: 0
};

const loadingStatesReducer = createReducer(
  initialState,
  on(setSourceDetailsLoadingState, (state, { loadingState }) => ({...state, saveCredetialsLoadingState: loadingState}))
);

export function loadingStatesReducers(state: LoadingStates | undefined, action: Action) {
  return loadingStatesReducer(state, action);
}
