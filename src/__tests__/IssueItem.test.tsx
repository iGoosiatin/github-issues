import React from 'react';
import IssueItem from '../components/IssueItem';

import { render } from '@testing-library/react-native';

describe('Issue Item component', () => {
  const number = 1;
  const title = 'Issue title';
  const login = 'User';
  const createdAt = '07 Jul 2022';
  const comments = 2;

  it('Renders correctly with comments', () => {
    const { getByText } = render(<IssueItem number={number} title={title} login={login} createdAt={createdAt} comments={comments} />);
    expect(getByText(title)).toBeTruthy();
    expect(getByText(`#${number} opened on ${createdAt} by ${login}`)).toBeTruthy();
    expect(getByText(`${comments} comment(s)`)).toBeTruthy();
  });

  it('Renders correctly with zero comments', () => {
    const { queryByText } = render(<IssueItem number={number} title={title} login={login} createdAt={createdAt} comments={0} />);
    expect(queryByText('comment')).toBeFalsy();
  });
});
