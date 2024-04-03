import { Issue, LoadingState, Release } from "./models/Issue";
import { SourceCredentials, SourceFieldsResponse, SourceProject } from "./models/ProjectSource";

export interface AppState{
  appData: AppData,
  loadingStates: LoadingStates,

}

export interface LoadingStates{
  saveCredetialsLoadingState: LoadingState,
  fetchCredentialsLoadingState: LoadingState,
  sourceProjectsAndCustomFieldsLoadingState: LoadingState,
  fetchReleaseLoadingState: LoadingState
}

export interface AppData{
  sourceCredentials: SourceCredentials,
  sourceFields: SourceFieldsResponse,
  isProjectSourceConfigured: boolean,
  releasesList: Release[],
  issues: Issue[]
}


export const defaultAppDate: AppData = {
  sourceCredentials: {
    id: 0,
    sourceAuthToken: '',
    sourceURL: '',
    sourceUserEmail: ''
  },
  sourceFields:{
    sourceCustomFields: [],
    storyPointsCustomField: undefined,
    teamBoardCustomField: undefined,
    sourceProjects: [],
    userProject: undefined
  },
  isProjectSourceConfigured: false,
  releasesList: [],
  issues: []
}

