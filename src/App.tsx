import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import Header from './components/Header';
import { SearchDataForm } from './components/Forms';
import IssueList from './components/IssueList';

import ISearchData from './types/SearchData';
import IIssue from './types/Issue';

const App = () => {
  const [searchData, setSearchData] = useState<ISearchData | null>(null);
  const [issues, setIssues] = useState<IIssue[]>([]);

  useEffect(() => {
    const loadIssues = async ({ user, repo }: ISearchData) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${user}/${repo}/issues`);
        if (response.ok) {
          const data: IIssue[] = await response.json();
          setIssues(data);
        } else {
          const error = await response.json();
          throw Error(error.message);
        }
      } catch (error) {
        Alert.alert(String(error));
        setIssues([]);
      }
    };
    if (searchData !== null) {
      loadIssues(searchData);
    }
  }, [searchData]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="GitHub Issues" />
      <SearchDataForm onSubmit={setSearchData} />
      <View>
        <IssueList issues={issues} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
