import { IIssueReducerState } from './reducers/issueReducer';

export const initialState: IIssueReducerState = {
  issues: [],
  isLoading: false,
  errorText: '',
  sortBy: 'created',
  sortDirection: 'desc',
  selectedSortOption: 0,
  filterBy: null,
  selectedFilterOption: 0,
  currentPage: 1,
  previousPage: null,
  nextPage: null,
  lastPage: 1,
};
