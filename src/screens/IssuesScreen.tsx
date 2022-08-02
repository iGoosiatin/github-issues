import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { loadIssues } from '../services/loadIssues';
import { SearchDataContext } from '../Context';
import IssueList from '../components/IssueList';

import IIssue from '../types/Issue';
import ISearchData from '../types/SearchData';
import { ILoadIssuesResponseFailure, ILoadIssuesResponseSuccess } from '../types/LoadIssuesReponse';

const IssuesScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<String>('');
  const [issues, setIssues] = useState<IIssue[]>([]);
  const { searchData } = useContext(SearchDataContext);

  useEffect(() => {
    const handleLoadIssues = async ({ user, repo }: ISearchData) => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    if (searchData !== null) {
      handleLoadIssues(searchData);
    }
  }, [searchData]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return errorText ? <Text style={styles.errorText}>{errorText}</Text> : <IssueList issues={issues} />;
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
});

export default IssuesScreen;
