import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SearchDataContext } from '../Context';
import IssueList from '../components/IssueList';

import IIssue from '../types/Issue';
import ISearchData from '../types/SearchData';

const IssuesScreen = () => {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const { searchData } = useContext(SearchDataContext);

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

  return <IssueList issues={issues} />;
};

export default IssuesScreen;
