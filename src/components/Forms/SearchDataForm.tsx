import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ControlledTextInput from './ControlledTextInput';
import Button from '../Button';
import ISearchData from '../../types/SearchData';

const validationSchema = yup
  .object()
  .shape({
    user: yup
      .string()
      .required('User is required')
      .min(3, 'Please enter at least 3 characters')
      .matches(/^[0-9a-zA-Z-]+$/, 'Must be only alphanumeric with dashes'),
    repo: yup
      .string()
      .required('Repo is required')
      .min(3, 'Please enter at least 3 characters')
      .matches(/^[0-9a-zA-Z-]+$/, 'Must be only alphanumeric with dashed'),
  })
  .required();

const defaultValues: ISearchData = {
  user: '',
  repo: '',
};

interface SearchDataFormProps {
  onSubmit: (values: ISearchData) => void;
}

const SearchDataForm: FC<SearchDataFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = (values: ISearchData) => {
    onSubmit(values);
  };

  return (
    <View style={styles.form}>
      <ControlledTextInput control={control} name="user" label="User:" placeholder="User..." error={errors.user} />
      <ControlledTextInput control={control} name="repo" label="Repo:" placeholder="Repo..." error={errors.repo} />
      <Button title="submit" onPress={handleSubmit(submit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
});

export default SearchDataForm;
