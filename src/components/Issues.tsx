import React, { useContext, useEffect, useState, useReducer, useCallback } from 'react';
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

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<String>('');

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
      setIsLoading(true);
      const response = await loadIssues({ user, repo, page, sortBy, sortDirection });
      if (response.isError) {
        const failedLoad = response as ILoadIssuesResponseFailure;
        setErrorText(failedLoad.errorText);
        dispatch({ type: 'SET_ISSUES', payload: { issues: [], lastPage: 1 } });
      } else {
        const successLoad = response as ILoadIssuesResponseSuccess;
        setErrorText('');
        dispatch({
          type: 'SET_ISSUES',
          payload: {
            issues: successLoad.issues,
            lastPage: Math.ceil(successLoad.openIssues / ITEMS_PER_PAGE),
          },
        });
      }
      setIsLoading(false);
    };
    if (searchData !== null) {
      handleLoadIssues(searchData, state.currentPage, state.sortBy, state.sortDirection);
    }
  }, [searchData, state.currentPage, state.sortBy, state.sortDirection]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (errorText) {
    return <Text style={styles.errorText}>{errorText}</Text>;
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
