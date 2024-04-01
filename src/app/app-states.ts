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
    Id: 0,
    SourceAuthToken: '',
    SourceURL: '',
    SourceUserEmail: ''
  },
  sourceFields:{
    sourceCustomFields: [],
    userCustomFields: [],
    sourceProject: [],
    userProject: undefined
  }
}

