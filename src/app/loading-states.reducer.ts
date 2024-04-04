import { createReducer, on, Action } from '@ngrx/store';
import * as action from './app.actions';
import { SourceCredentials } from './models/ProjectSource';
import { LoadingStates } from './app-states';

export const initialState = {
  saveCredetialsLoadingState: 0,
  sourceProjectsAndCustomFieldsLoadingState: 0,
  fetchCredentialsLoadingState: 0,
  fetchReleaseLoadingState: 0,
  releaseIssuesLoadingState: 0,
  addSourceAndCustomFieldsLoadingState: 0
};

const loadingStatesReducer = createReducer(
  initialState,
  on(action.setSourceDetailsLoadingState, (state, { loadingState }) => ({...state, saveCredetialsLoadingState: loadingState})),
  on(action.setSourceProjectsAndCustomFieldsLoadingState, (state, { loadingState }) => ({...state, sourceProjectsAndCustomFieldsLoadingState: loadingState})),
  on(action.setFetchSourceDetailsLoadingState, (state, { loadingState }) => ({...state, fetchCredentialsLoadingState: loadingState})),
  on(action.setAllFetchReleasesLoadingState, (state, { loadingState }) => ({...state, fetchReleaseLoadingState: loadingState})),
  on(action.setReleaseIssuesLoadingState, (state, { loadingState }) => ({...state, releaseIssuesLoadingState: loadingState})),
  on(action.setAddProjectsAndCustomFieldLoadingState, (state, { loadingState }) => ({...state, addSourceAndCustomFieldsLoadingState: loadingState})),
);

export function loadingStatesReducers(state: LoadingStates | undefined, action: Action) {
  return loadingStatesReducer(state, action);
}
