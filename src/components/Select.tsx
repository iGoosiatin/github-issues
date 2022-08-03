import React, { FC, memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ISelectOption } from '../types/Select';

interface SelectProps<T> {
  title: string;
  options: ISelectOption<T>[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const Select: FC<SelectProps<any>> = ({ title, options, selectedIndex = 0, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <SelectDropdown
        data={options}
        defaultValueByIndex={selectedIndex}
        onSelect={(_, index) => {
          onSelect(index);
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
    width: '30%',
    marginLeft: 5,
  },
  dropdownButtonStyle: {
    width: '100%',
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

export default Select;

export const MemoizedSelect = memo(Select);
