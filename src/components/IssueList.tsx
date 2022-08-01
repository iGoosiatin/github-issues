import React, { FC } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import IssueItem from './IssueItem';
import IIssue from '../types/Issue';

interface IssueListProps {
  issues: IIssue[];
}

const IssueList: FC<IssueListProps> = ({ issues }) => {
  if (issues.length < 1) {
    return <Text style={styles.text}>No issues to show</Text>;
  }
  return (
    <FlatList
      data={issues}
      renderItem={({ item }) => (
        <IssueItem
          number={item.number}
          title={item.title}
          login={item.user.login}
          comments={item.comments}
          createdAt={item.created_at}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default IssueList;
