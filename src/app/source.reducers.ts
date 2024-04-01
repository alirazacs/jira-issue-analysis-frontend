import { createReducer, on, Action } from '@ngrx/store';
import { postSourceDetails, setSourceDetails, setSourceProjects } from './app.actions';
import { SourceCredentials } from './models/ProjectSource';
import { AppData, defaultAppDate } from './app-states';



const sourceCredentialsReducer = createReducer(
  defaultAppDate,
  on(setSourceDetails, (state, { sourceDetails }) => ({
    ...state,
    sourceCredentials: sourceDetails ,
  })),
  on(setSourceProjects, (state, { sourceProjects }) => ({
    ...state,
    sourceProjects: sourceProjects,
  })),
);

export function sourceReducer(state: AppData | undefined, action: Action) {
  return sourceCredentialsReducer(state, action);
}
