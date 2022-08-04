import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

interface IssueItemProps {
  number: number;
  title: string;
  login: string;
  createdAt: string;
  comments: number;
  type: undefined | object;
}

const IssueItem: FC<IssueItemProps> = ({ number, title, login, comments, createdAt, type }) => {
  const formattedDate = format(new Date(createdAt), 'dd MMM yyyy');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`[${type !== undefined ? 'PR' : 'Issue'}] `}
        {title}
      </Text>
      <Text>{`#${number} opened on ${formattedDate} by ${login}`}</Text>
      {!!comments && <Text>{`${comments} comment(s)`}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'darkgray',
    borderBottomWidth: 2,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default IssueItem;
