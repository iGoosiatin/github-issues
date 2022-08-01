import React, { useContext } from 'react';
import { SearchDataForm } from '../components/Forms';
import { SearchDataContext } from '../Context';

import ISearchData from '../types/SearchData';

const HomeScreen = ({ navigation }: any) => {
  const { setSearchData } = useContext(SearchDataContext);

  const onSearchSumbit = (data: ISearchData) => {
    setSearchData(data);
    navigation.navigate('Issues');
  };

  return <SearchDataForm onSubmit={onSearchSumbit} />;
};

export default HomeScreen;
