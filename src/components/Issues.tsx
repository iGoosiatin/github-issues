import React, { useContext, useEffect, useReducer, useCallback } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { loadIssues } from '../services/loadIssues';
import { SearchDataContext } from '../Context';
import { MemoizedSort } from './Sort';
import IssueList from './IssueList';
import { MemoizedPaginationControls } from './Pagination/PaginationControls';
import issueReducer, { IIssueReducerState } from '../reducers/issueReducer';
import { ITEMS_PER_PAGE } from '../Constants';
import { sortOptions } from '../Utils';

import ISearchData from '../types/SearchData';
import { ILoadIssuesResponseFailure, ILoadIssuesResponseSuccess } from '../types/LoadIssuesReponse';
import { SortByType, SortDirectionType } from '../types/Sort';

const initialState: IIssueReducerState = {
  issues: [],
  isLoading: false,
  errorText: '',
  sortBy: 'created',
  sortDirection: 'desc',
  selectedSortOption: 0,
  currentPage: 1,
  previousPage: null,
  nextPage: null,
  lastPage: 1,
};

const Issues = () => {
  const { searchData } = useContext(SearchDataContext);
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

  useEffect(() => {
    const handleLoadIssues = async (
      { user, repo }: ISearchData,
      page: number,
      sortBy: SortByType,
      sortDirection: SortDirectionType,
    ) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await loadIssues({ user, repo, page, sortBy, sortDirection });
      if (response.isError) {
        const failedLoad = response as ILoadIssuesResponseFailure;
        dispatch({ type: 'SET_ERROR', payload: failedLoad.errorText });
      } else {
        const successLoad = response as ILoadIssuesResponseSuccess;
        dispatch({
          type: 'SET_ISSUES',
          payload: {
            issues: successLoad.issues,
            lastPage: Math.ceil(successLoad.openIssues / ITEMS_PER_PAGE),
          },
        });
      }
    };

    if (searchData !== null) {
      handleLoadIssues(searchData, state.currentPage, state.sortBy, state.sortDirection);
    }
  }, [searchData, state.currentPage, state.sortBy, state.sortDirection]);

  if (state.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (state.errorText) {
    return <Text style={styles.errorText}>{state.errorText}</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <MemoizedSort options={sortOptions} selectedIndex={state.selectedSortOption} onSort={onSort} />
      </View>
      <View style={styles.list}>
        <IssueList issues={state.issues} />
      </View>
      <MemoizedPaginationControls
        currentPage={state.currentPage}
        previousPage={state.previousPage}
        nextPage={state.nextPage}
        lastPage={state.lastPage}
        setPage={setPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default Issues;
