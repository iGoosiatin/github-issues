import IIssue from './Issue';

export interface ILoadIssuesResponseSuccess {
  isError: boolean;
  issues: IIssue[];
  openIssues: number;
}

export interface ILoadIssuesResponseFailure {
  isError: boolean;
  errorText: string;
}
