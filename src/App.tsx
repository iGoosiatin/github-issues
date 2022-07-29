import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { SearchDataForm } from './components/Forms';

import ISearchData from './types/SearchData';

const App = () => {
  const [searchData, setSearchData] = useState<ISearchData | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="GitHub Issues" />
      <SearchDataForm onSubmit={setSearchData} />
      <View>
        <Text>{JSON.stringify(searchData)}</Text>
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
