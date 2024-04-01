import { createAction, props } from '@ngrx/store';
import { SourceCredentials } from './models/ProjectSource';
import { LoadingState } from './models/Issue';

export const setSourceDetails = createAction('[setSourceDetails] Set Source URL', props<{ sourceDetails: SourceCredentials }>());
export const postSourceDetails = createAction('[postSourceDetails] Post Source URL', props<{ sourceDetails: SourceCredentials }>());
export const fetchError = createAction('[fetchError] FetchError');

//loading states
export const setSourceDetailsLoadingState = createAction('[setSourceDetailsLoadingState] Source details loading state', props<{ loadingState: LoadingState }>());
