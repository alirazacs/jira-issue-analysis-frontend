import { createAction, props } from '@ngrx/store';
import { SourceCredentials, SourceFieldsResponse, SourceProject } from './models/ProjectSource';
import { Issue, LoadingState, Release } from './models/Issue';

export const setSourceDetails = createAction('[setSourceDetails] Set Source URL', props<{ sourceDetails: SourceCredentials }>());
export const fetchSourceDetails = createAction('[fetchSourceDetails] Fetch Source Details');
export const postSourceDetails = createAction('[postSourceDetails] Post Source URL', props<{ sourceDetails: SourceCredentials }>());
export const fetchError = createAction('[fetchError] FetchError');
export const fetchSourceProjectsAndCustomFields = createAction('[fetchSourceProjectsAndCustomFields] Fetch Source Projects And Custom Fields');
export const setSourceProjectsAndCustomFields = createAction('[setSourceProjectsAndCustomFields] Set Source Projects And Custom Fields', props<{sourceFields: SourceFieldsResponse}>());
export const postSourceProjectsAndCustomFields = createAction('[postSourceProjectsAndCustomFields] Post Source Projects And Custom Fields', props<{sourceFields: SourceFieldsResponse}>());
export const fetchAllReleases = createAction('[fetchAllReleases] Fetch All Releases');
export const setAllReleases = createAction('[setAllReleases] Set All Releases',props<{releases: Release[]}>());
export const fetchReleasesIssues = createAction('[fetchReleasesIssues] Fetch ReleaseIssues', props<{release: Release}>());
export const setReleaseIssues = createAction('[setReleaseIssues] Set Release Issues',props<{releaseIssues: Issue[]}>());

//loading states
export const setSourceDetailsLoadingState = createAction('[setSourceDetailsLoadingState] Source details loading state', props<{ loadingState: LoadingState }>());
export const setSourceProjectsLoadingState = createAction('[setSourceProjectsLoadingState] Source projects loading state', props<{ loadingState: LoadingState }>());
export const setSourceProjectsAndCustomFieldsLoadingState = createAction('[setSourceProjectsAndCustomFieldsLoadingState] Source projects and customfields loading state', props<{ loadingState: LoadingState }>());
export const setFetchSourceDetailsLoadingState = createAction('[setFetchSourceDetailsLoadingState] fetch Source details loading state', props<{ loadingState: LoadingState }>());
export const setAllFetchReleasesLoadingState = createAction('[setFetchSourceDetailsLoadingState] fetch Releases loading state', props<{ loadingState: LoadingState }>());
export const setReleaseIssuesLoadingState = createAction('[setReleaseIssuesLoadingState] fetch Releases issues loading state', props<{ loadingState: LoadingState }>());
