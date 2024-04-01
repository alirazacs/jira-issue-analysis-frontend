import { createAction, props } from '@ngrx/store';
import { SourceCredentials, SourceFieldsResponse, SourceProject } from './models/ProjectSource';
import { LoadingState } from './models/Issue';

export const setSourceDetails = createAction('[setSourceDetails] Set Source URL', props<{ sourceDetails: SourceCredentials }>());
export const postSourceDetails = createAction('[postSourceDetails] Post Source URL', props<{ sourceDetails: SourceCredentials }>());
export const fetchError = createAction('[fetchError] FetchError');
export const fetchSourceProjectsAndCustomFields = createAction('[fetchSourceProjectsAndCustomFields] Fetch Source Projects And Custom Fields');
export const setSourceProjectsAndCustomFields = createAction('[setSourceProjectsAndCustomFields] Set Source Projects And Custom Fields', props<{sourceFields: SourceFieldsResponse}>());

//loading states
export const setSourceDetailsLoadingState = createAction('[setSourceDetailsLoadingState] Source details loading state', props<{ loadingState: LoadingState }>());
export const setSourceProjectsLoadingState = createAction('[setSourceProjectsLoadingState] Source projects loading state', props<{ loadingState: LoadingState }>());
