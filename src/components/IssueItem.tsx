import React, { FC } from 'react';
import { View, Text } from 'react-native';

interface IssueItemProps {
  number: number;
  title: string;
  login: string;
}

const IssueItem: FC<IssueItemProps> = ({ number, title, login }) => (
  <View>
    <Text>
      {number} {title} {login}
    </Text>
  </View>
);
export default IssueItem;
