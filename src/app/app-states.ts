import { LoadingState } from "./models/Issue";
import { SourceCredentials, SourceProject } from "./models/ProjectSource";

export interface AppState{
  appData: AppData,
  loadingStates: LoadingStates,

}

export interface LoadingStates{
  saveCredetialsLoadingState: LoadingState
}

export interface AppData{
  sourceCredentials: SourceCredentials,
  sourceProjects: SourceProject[]
}


export const defaultAppDate: AppData = {
  sourceCredentials: {
    Id: 0,
    SourceAuthToken: '',
    SourceURL: '',
    SourceUserEmail: ''
  },
  sourceProjects: []
}

