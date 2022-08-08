import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { useIssues } from '../hooks/useIssues';
import { SearchDataContext } from '../Context';
import IssueList from './IssueList';
import { MemoizedSelect } from './Select';
import { MemoizedPaginationControls } from './Pagination/PaginationControls';
import { initialState } from '../State';

import { sortOptions, filterOptions } from '../Utils';

const Issues = () => {
  const { searchData } = useContext(SearchDataContext);
  const { state, handleLoadIssues, onFilter, onSort, setPage } = useIssues(initialState);

  useEffect(() => {
    if (searchData) {
      handleLoadIssues(searchData);
    }
  }, [handleLoadIssues, searchData]);

  if (state.errorText) {
    return <Text style={styles.errorText}>{state.errorText}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <MemoizedSelect title="Sort By:" options={sortOptions} selectedIndex={state.selectedSortOption} onSelect={onSort} />
        <MemoizedSelect
          title="Filter By:"
          options={filterOptions}
          selectedIndex={state.selectedFilterOption}
          onSelect={onFilter}
          placeholder="Select filter"
        />
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
