import React, { FC } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import IssueItem from './IssueItem';

import IIssue from '../types/Issue';
import { FilterType } from '../types/Filter';

interface IssueListProps {
  issues: IIssue[];
  filter: FilterType;
}

const IssueList: FC<IssueListProps> = ({ issues, filter }) => {
  if (issues.length < 1) {
    return <Text style={styles.text}>No issues to show</Text>;
  }
  return (
    <FlatList
      data={
        filter
          ? issues.filter((issue) => (filter === 'issues' ? issue.pull_request === undefined : issue.pull_request !== undefined))
          : issues
      }
      renderItem={({ item }) => (
        <IssueItem
          number={item.number}
          title={item.title}
          login={item.user.login}
          comments={item.comments}
          createdAt={item.created_at}
          type={item.pull_request}
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
