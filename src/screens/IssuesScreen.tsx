import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { loadIssues } from '../services/loadIssues';
import { SearchDataContext } from '../Context';
import IssueList from '../components/IssueList';

import IIssue from '../types/Issue';
import ISearchData from '../types/SearchData';
import { ILoadIssuesResponseFailure, ILoadIssuesResponseSuccess } from '../types/LoadIssuesReponse';

const IssuesScreen = () => {
  const [errorText, setErrorText] = useState<String>('');
  const [issues, setIssues] = useState<IIssue[]>([]);
  const { searchData } = useContext(SearchDataContext);

  useEffect(() => {
    const handleLoadIssues = async ({ user, repo }: ISearchData) => {
      const response = await loadIssues({ user, repo });
      if (response.isError) {
        const failedLoad = response as ILoadIssuesResponseFailure;
        setErrorText(failedLoad.errorText);
        setIssues([]);
      } else {
        const successLoad = response as ILoadIssuesResponseSuccess;
        setErrorText('');
        setIssues(successLoad.issues);
      }
    };
    if (searchData !== null) {
      handleLoadIssues(searchData);
    }
  }, [searchData]);

  return errorText ? <Text style={styles.errorText}>{errorText}</Text> : <IssueList issues={issues} />;
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
});

export default IssuesScreen;
