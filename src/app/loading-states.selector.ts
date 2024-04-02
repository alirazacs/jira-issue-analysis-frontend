import { createSelector, select } from "@ngrx/store";
import { AppData, AppState, LoadingStates } from "./app-states";
import { filter, pipe } from "rxjs";

const loadingStateSelector = createSelector(
  (state: AppState) => state.loadingStates,
  (loadingStates: LoadingStates) => loadingStates
);

const sourceProjectsSelector = createSelector(
  (state: AppState) => state.appData,
  (appState: AppData) => appState.sourceFields
);

const sourceCredentialsSelector = createSelector(
  (state: AppState) => state.appData,
  (appState: AppData) => appState.sourceCredentials
);

const isProjectSourceConfiguredSelector = createSelector(
  (state: AppState) => state.appData,
  (appState: AppData) => appState.isProjectSourceConfigured
);


export const selectLoadingStates = pipe(
  select(loadingStateSelector)
);

export const selectSourceProjects = pipe(
  select(sourceProjectsSelector),
  filter(project => project != null)
);

export const selectSourceCredentials = pipe(
  select(sourceCredentialsSelector)
);

export const selectIsSourceConfigured = pipe(
  select(isProjectSourceConfiguredSelector)
);
