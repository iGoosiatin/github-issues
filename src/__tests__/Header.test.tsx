import React from 'react';
import Header from '../components/Header';

import { render } from '@testing-library/react-native';

describe('Header component', () => {
  it('Renders correctly', () => {
    const title = 'header';
    const { getByText } = render(<Header title={title} />);
    expect(getByText(title)).toBeTruthy();
  });
});
