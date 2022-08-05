import { useCallback, useReducer } from 'react';
import issueReducer, { IIssueReducerState } from '../reducers/issueReducer';
import { loadIssues } from '../services/loadIssues';

import { ITEMS_PER_PAGE } from '../Constants';

import { ISearchData } from '../types/SearchData';

export function useIssues(initialState: IIssueReducerState) {
  const [state, dispatch] = useReducer(issueReducer, initialState);

  const setPage = useCallback((page: number | null) => {
    if (page === null) {
      return;
    }
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  const onSort = useCallback((selectedIndex: number) => {
    dispatch({ type: 'SET_SORTING_OPTION', payload: selectedIndex });
  }, []);

  const onFilter = useCallback((selectedIndex: number) => {
    dispatch({ type: 'SET_FILTER_OPTION', payload: selectedIndex });
  }, []);

  const handleLoadIssues = useCallback(
    async ({ user, repo }: ISearchData) => {
      setTimeout(() => {
        if (response) {
          return;
        }
        dispatch({ type: 'SET_LOADING', payload: true });
      }, 700);
      const response = await loadIssues({
        user,
        repo,
        page: state.currentPage,
        sortBy: state.sortBy,
        sortDirection: state.sortDirection,
      });
      if (response.isError) {
        dispatch({ type: 'SET_ERROR', payload: response.errorText });
      } else {
        dispatch({
          type: 'SET_ISSUES',
          payload: {
            issues: response.issues,
            lastPage: Math.ceil(response.openIssues / ITEMS_PER_PAGE),
          },
        });
      }
    },
    [state.currentPage, state.sortBy, state.sortDirection],
  );

  return { state, handleLoadIssues, setPage, onSort, onFilter };
}
