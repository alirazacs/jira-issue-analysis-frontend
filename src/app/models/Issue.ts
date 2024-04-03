import { IssueTimeSpent } from "./IssueTimeSpent";

export interface Issue{
  id:string;
  issueEstimatedAndSpentTime:IssueTimeSpent;
  storyPoints:number;
  issueType : object;
  summary:string;
  status:string;
  productivityRatio:number;
  createdDate:Date;
  resolvedDate:Date;
}

export enum LoadingState{
  PENDING, LOADING, DONE, ERROR
}
