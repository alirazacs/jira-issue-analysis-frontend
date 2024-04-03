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


export interface Release
{
  id: string;
  name: string;
  released: boolean;
  releaseDate: string;
}
export enum LoadingState{
  PENDING, LOADING, DONE, ERROR
}

export interface IssueSummary {
  issues: Issue[];
  totalIssues: number;
  numberOfInProgressIssues: number;
  numberOfResolvedIssues: number;
  totalStoryPoints: number;
}
