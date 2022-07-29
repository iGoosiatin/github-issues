import React, { FC } from 'react';
import { Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useController } from 'react-hook-form';

interface ControlledTextInputProps extends TextInputProps {
  control: any;
  name: string;
  label: string;
  error: any;
}

const ControlledTextInput: FC<ControlledTextInputProps> = ({ control, name, label, error, ...restProps }) => {
  const { field } = useController({ control, name });
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...restProps}
        style={[styles.input, error && styles.errorInput]}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginTop: 5,
  },
  input: {
    fontSize: 18,
    borderColor: '#bebebe',
    borderWidth: 2,
    padding: 1,
    paddingLeft: 5,
    width: '100%',
  },
  errorInput: {
    borderColor: '#d99191',
  },
  errorText: {
    color: 'firebrick',
  },
});

export default ControlledTextInput;
