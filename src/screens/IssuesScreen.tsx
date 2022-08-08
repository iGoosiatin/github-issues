import React, { useContext } from 'react';
import Issues from '../components/Issues';
import { SearchDataContext } from '../Context';

const IssuesScreen = () => {
  const { searchData } = useContext(SearchDataContext);

  return <Issues searchData={searchData} />;
};

export default IssuesScreen;
