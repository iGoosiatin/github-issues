import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from './components/Header';
import Navigation from './components/Navigation';

import { ISearchData } from './types/SearchData';

import { SearchDataContext } from './Context';

const App = () => {
  const [searchData, setSearchData] = useState<ISearchData | null>(null);
  const searchDataStore = useMemo(() => ({ searchData, setSearchData }), [searchData]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="GitHub Issues" />
      <SearchDataContext.Provider value={searchDataStore}>
        <Navigation />
      </SearchDataContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
