import ISearchData from '../types/SearchData';
import { ILoadIssuesResponseSuccess, ILoadIssuesResponseFailure } from '../types/LoadIssuesReponse';

import { ITEMS_PER_PAGE } from '../Constants';

const API_URL = 'https://api.github.com/repos';

interface ILoadIssues extends ISearchData {
  page?: number;
  perPage?: number;
  sort?: 'created' | 'updated' | 'comments';
  sortDirection?: 'asc' | 'desc';
}

export const loadIssues = async ({
  user,
  repo,
  page = 1,
  perPage = ITEMS_PER_PAGE,
  sort = 'created',
  sortDirection = 'desc',
}: ILoadIssues) => {
  const REPO_URL = `${API_URL}/${user}/${repo}`;

  try {
    const responseReturn: ILoadIssuesResponseSuccess = {
      isError: false,
      issues: [],
      openIssues: 0,
    };

    const repoResponse = await fetch(REPO_URL);
    if (!repoResponse.ok) {
      const error = await repoResponse.json();
      throw Error(error.message);
    } else {
      const repoData = await repoResponse.json();

      // No issues
      if (repoData.open_issues_count === 0) {
        return responseReturn;
      }

      responseReturn.openIssues = repoData.open_issues_count;

      // Build issue URL
      const ISSUES_URL = `${REPO_URL}/issues?page=${[page]}&per_page=${perPage}&sort=${sort}&direction=${sortDirection}`;

      const issueResponse = await fetch(ISSUES_URL);
      if (!issueResponse.ok) {
        const error = await issueResponse.json();
        throw Error(error.message);
      } else {
        const issueData = await issueResponse.json();
        responseReturn.issues = issueData;
        return responseReturn;
      }
    }
  } catch (error) {
    const responseReturn: ILoadIssuesResponseFailure = {
      isError: true,
      errorText: String(error),
    };
    return responseReturn;
  }
};
