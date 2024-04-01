import { IssueTimeSpent } from "./IssueTimeSpent";

export interface Issue{
  id:string;
  issueEstimatedAndSpentTime:IssueTimeSpent;
  storyPoints:number;
}

export enum LoadingState{
  PENDING, LOADING, DONE, ERROR
}
