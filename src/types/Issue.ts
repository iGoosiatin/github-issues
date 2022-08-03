/* eslint-disable semi */
export default interface IIssue {
  id: string;
  number: number;
  user: {
    login: string;
  };
  title: string;
  created_at: string;
  comments: number;
  pull_request?: object;
}
