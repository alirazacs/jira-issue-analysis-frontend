import { createAction, props } from '@ngrx/store';
import { SourceCredentials, SourceProject } from './models/ProjectSource';
import { LoadingState } from './models/Issue';

export const setSourceDetails = createAction('[setSourceDetails] Set Source URL', props<{ sourceDetails: SourceCredentials }>());
export const postSourceDetails = createAction('[postSourceDetails] Post Source URL', props<{ sourceDetails: SourceCredentials }>());
export const fetchError = createAction('[fetchError] FetchError');
export const fetchSourceProjects = createAction('[fetchSourceProjects] Fetch Source Projects');
export const setSourceProjects = createAction('[setSourceProjects] Set Source Projects', props<{sourceProjects: SourceProject[]}>());

//loading states
export const setSourceDetailsLoadingState = createAction('[setSourceDetailsLoadingState] Source details loading state', props<{ loadingState: LoadingState }>());
export const setSourceProjectsLoadingState = createAction('[setSourceProjectsLoadingState] Source projects loading state', props<{ loadingState: LoadingState }>());
