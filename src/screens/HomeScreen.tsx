import React, { useContext } from 'react';
import { SearchDataForm } from '../components/Forms';
import { SearchDataContext } from '../Context';

import { SCREENS } from '../Constants';

import { ISearchData } from '../types/SearchData';

const HomeScreen = ({ navigation }: any) => {
  const { setSearchData } = useContext(SearchDataContext);

  const onSearchSubmit = (data: ISearchData) => {
    setSearchData(data);
    navigation.navigate(SCREENS.ISSUES);
  };

  return <SearchDataForm onSubmit={onSearchSubmit} />;
};

export default HomeScreen;
