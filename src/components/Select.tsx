import React, { FC, memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ISelectOption } from '../types/Select';

interface SelectProps<T> {
  title: string;
  options: ISelectOption<T>[];
  selectedIndex: number;
  placeholder?: string;
  onSelect: (index: number) => void;
}

const Select: FC<SelectProps<string | object | null>> = ({ title, options, selectedIndex = 0, placeholder, onSelect }) => {
  const renderItem = (item: ISelectOption<string | object | null>) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        placeholder={placeholder}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={options[selectedIndex]}
        onChange={(item) => {
          const index = options.findIndex((option) => option.label === item.label);
          onSelect(index || 0);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    marginLeft: 5,
  },
  dropdown: {
    width: '100%',
    height: 30,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#444',
    paddingLeft: 5,
  },
  textItem: {
    flex: 1,
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  row: {
    height: 30,
    justifyContent: 'center',
  },
  rowText: {
    color: '#444',
    textAlign: 'left',
    fontSize: 12,
    paddingLeft: 5,
  },
});

export default Select;

export const MemoizedSelect = memo(Select);
