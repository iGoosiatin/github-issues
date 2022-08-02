import React, { useContext, useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { loadIssues } from '../services/loadIssues';
import { SearchDataContext } from '../Context';
import IssueList from './IssueList';
import PaginationControls from './Pagination/PaginationControls';
import pageReducer, { IPageReducerState } from '../reducers/pageReducer';
import { ITEMS_PER_PAGE } from '../Constants';

import IIssue from '../types/Issue';
import ISearchData from '../types/SearchData';
import { ILoadIssuesResponseFailure, ILoadIssuesResponseSuccess } from '../types/LoadIssuesReponse';

const initialState: IPageReducerState = {
  currentPage: 1,
  previousPage: null,
  nextPage: null,
  lastPage: 1,
};

const Issues = () => {
  const { searchData } = useContext(SearchDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<String>('');
  const [issues, setIssues] = useState<IIssue[]>([]);

  const [state, dispatch] = useReducer(pageReducer, initialState);

  useEffect(() => {
    const handleLoadIssues = async ({ user, repo }: ISearchData, page: number) => {
      setIsLoading(true);
      const response = await loadIssues({ user, repo, page });
      if (response.isError) {
        const failedLoad = response as ILoadIssuesResponseFailure;
        setErrorText(failedLoad.errorText);
        setIssues([]);
      } else {
        const successLoad = response as ILoadIssuesResponseSuccess;
        setErrorText('');
        setIssues(successLoad.issues);
        dispatch({ type: 'SET_LAST_PAGE', payload: Math.ceil(successLoad.openIssues / ITEMS_PER_PAGE) });
      }
      setIsLoading(false);
    };
    if (searchData !== null) {
      handleLoadIssues(searchData, state.currentPage);
    }
  }, [searchData, state.currentPage]);

  const setPage = (page: number | null) => {
    if (page === null) {
      return;
    }
    dispatch({ type: 'SET_PAGE', payload: page });
  };

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
      <View style={styles.list}>
        <IssueList issues={issues} />
      </View>
      <PaginationControls
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
