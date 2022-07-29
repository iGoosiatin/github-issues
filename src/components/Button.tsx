import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 0,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'black',
  },
});

Button.defaultProps = {
  title: 'submit',
};

export default Button;
