import { LoadingState } from "./models/Issue";
import { SourceCredentials } from "./models/ProjectSource";

export interface AppState{
  sourceCredentials: SourceCredentials,
  loadingStates: LoadingStates
}

export interface LoadingStates{
  saveCredetialsLoadingState: LoadingState
}

