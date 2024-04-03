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

const releasesSelector = createSelector(
  (state: AppState) => state.appData,
  (appState: AppData) => appState.releasesList
);

const issuesSelector = createSelector(
  (state: AppState) => state.appData,
  (appState: AppData) => appState.issues
);

const issuesAndReleaseLoadingStatesSelector = createSelector(
  (state: AppState) => state.loadingStates,
  (loadingStates: LoadingStates) => loadingStates.fetchReleaseLoadingState == 1 || loadingStates.releaseIssuesLoadingState == 1 || loadingStates.releaseIssuesLoadingState == 3 || loadingStates.fetchReleaseLoadingState == 3
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

export const selectReleases = pipe(
  select(releasesSelector)
);

export const selectIssues = pipe(
  select(issuesSelector),
  filter(issues => issues !== null)
);

export const issueAnalysisLoadingState = pipe(
  select(issuesAndReleaseLoadingStatesSelector)
);
