import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface SortProps {
  options: any;
  selectedIndex: number;
  onSort: (index: number) => void;
}

const Sort: FC<SortProps> = ({ options, selectedIndex = 0, onSort }) => {
  return (
    <View style={styles.container}>
      <Text>Sort By:</Text>
      <SelectDropdown
        data={options}
        defaultValueByIndex={selectedIndex}
        onSelect={(selectedItem, index) => {
          onSort(index);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item) => {
          return item.label;
        }}
        buttonStyle={styles.dropdownButtonStyle}
        buttonTextStyle={styles.dropdownButtonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'darkgray',
  },
  dropdownButtonStyle: {
    width: '30%',
    height: 30,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#444',
    paddingHorizontal: 0,
  },
  dropdownButtonTextStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 12,
  },
  dropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdownRowStyle: {
    height: 30,
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    paddingHorizontal: 0,
  },
  dropdownRowTextStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 12,
  },
});

export default Sort;
