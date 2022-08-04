import IIssue from './Issue';

export interface ILoadIssuesResponse {
  isError: boolean;
  issues: IIssue[];
  openIssues: number;
  errorText: string;
}
