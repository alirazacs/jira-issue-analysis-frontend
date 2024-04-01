import { LoadingState } from "./models/Issue";
import { SourceCredentials, SourceFieldsResponse, SourceProject } from "./models/ProjectSource";

export interface AppState{
  appData: AppData,
  loadingStates: LoadingStates,

}

export interface LoadingStates{
  saveCredetialsLoadingState: LoadingState
}

export interface AppData{
  sourceCredentials: SourceCredentials,
  sourceFields: SourceFieldsResponse
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
  }
}

