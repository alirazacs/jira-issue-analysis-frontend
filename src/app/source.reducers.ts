import { createReducer, on, Action } from '@ngrx/store';
import { postSourceDetails, setAllReleases, setSourceDetails, setSourceProjectsAndCustomFields } from './app.actions';
import { SourceCredentials } from './models/ProjectSource';
import { AppData, defaultAppDate } from './app-states';



const sourceCredentialsReducer = createReducer(
  defaultAppDate,
  on(setSourceDetails, (state, { sourceDetails }) => ({
    ...state,
    sourceCredentials: sourceDetails,
    isProjectSourceConfigured: sourceDetails != null
  })),
  on(setSourceProjectsAndCustomFields, (state, { sourceFields }) => ({
    ...state,
    sourceFields: sourceFields
  })),

  on(setSourceProjectsAndCustomFields, (state, { sourceFields }) => ({
    ...state,
    sourceFields: sourceFields
  })),

  on(setAllReleases, (state, { releases }) => ({
    ...state,
    releasesList: releases
  })),
);

export function sourceReducer(state: AppData | undefined, action: Action) {
  return sourceCredentialsReducer(state, action);
}
