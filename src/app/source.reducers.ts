import { createReducer, on, Action } from '@ngrx/store';
import { postSourceDetails, setSourceDetails } from './app.actions';
import { SourceCredentials } from './models/ProjectSource';

export const initialState = {
  Id:0,
  SourceURL: '',
  SourceUserEmail: '',
  SourceAuthToken: ''
};

const sourceCredentialsReducer = createReducer(
  initialState,
  on(setSourceDetails, (state, { sourceDetails }) => sourceDetails)
);

export function sourceReducer(state: SourceCredentials | undefined, action: Action) {
  return sourceCredentialsReducer(state, action);
}
