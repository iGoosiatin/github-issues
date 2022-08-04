import React, { useContext, useEffect, useReducer, useCallback } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { loadIssues } from '../services/loadIssues';
import { SearchDataContext } from '../Context';
import { MemoizedSelect } from './Select';
import IssueList from './IssueList';
import { MemoizedPaginationControls } from './Pagination/PaginationControls';
import issueReducer, { IIssueReducerState } from '../reducers/issueReducer';
import { ITEMS_PER_PAGE } from '../Constants';
import { sortOptions, filterOptions } from '../Utils';

import { ISearchData } from '../types/SearchData';
import { SortByType, SortDirectionType } from '../types/Sort';

const initialState: IIssueReducerState = {
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

  const onFilter = useCallback((selectedIndex: number) => {
    dispatch({ type: 'SET_FILTER_OPTION', payload: selectedIndex });
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
    };

    if (searchData) {
      handleLoadIssues(searchData, state.currentPage, state.sortBy, state.sortDirection);
    }
  }, [searchData, state.currentPage, state.sortBy, state.sortDirection]);

  if (state.errorText) {
    return <Text style={styles.errorText}>{state.errorText}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <MemoizedSelect title="Sort By:" options={sortOptions} selectedIndex={state.selectedSortOption} onSelect={onSort} />
        <MemoizedSelect title="Filter By:" options={filterOptions} selectedIndex={state.selectedFilterOption} onSelect={onFilter} />
      </View>
      {state.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <View style={styles.list}>
          <IssueList issues={state.issues} filter={state.filterBy} />
        </View>
      )}
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
  controls: {
    flexDirection: 'row',
    marginTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'darkgray',
  },
  list: {
    flex: 1,
  },
});

export default Issues;
