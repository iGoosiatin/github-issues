import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PaginationButtonProps {
  title: string;
  current?: boolean;
  disabled?: boolean;
  setCurrent: () => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({ title, current = false, disabled = false, setCurrent }) => {
  return (
    <TouchableOpacity style={[styles.button, current && styles.buttonCurrent]} disabled={disabled || current} onPress={setCurrent}>
      <Text style={[styles.title, current && styles.titleCurrent, disabled && styles.titleDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
  buttonCurrent: {
    backgroundColor: 'darkgray',
  },
  title: {
    padding: 5,
  },
  titleCurrent: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleDisabled: {
    color: 'lightgray',
  },
});

export default PaginationButton;
