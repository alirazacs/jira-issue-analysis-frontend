import { createAction, props } from '@ngrx/store';
import { SourceCredentials } from './models/ProjectSource';

export const setSourceDetails = createAction('[setSourceDetails] Set Source URL', props<{ sourceDetails: SourceCredentials }>());
export const postSourceDetails = createAction('[PostSourceDetails] Post Source URL', props<{ sourceDetails: SourceCredentials }>());
export const fetchError = createAction('[Request] FetchError');
