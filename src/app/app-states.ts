import { LoadingStates } from "./models/Issue";
import { SourceCredentials } from "./models/ProjectSource";

export interface AppState{
  sourceCredentials: SourceCredentials,
}

export interface LoadingState{
  saveCredetialsLoadingState: LoadingStates
}
