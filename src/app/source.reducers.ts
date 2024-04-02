import { createReducer, on, Action } from '@ngrx/store';
import { postSourceDetails, setSourceDetails, setSourceProjectsAndCustomFields } from './app.actions';
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
);

export function sourceReducer(state: AppData | undefined, action: Action) {
  return sourceCredentialsReducer(state, action);
}
