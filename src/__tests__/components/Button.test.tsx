import React from 'react';
import Button from '../../components/Button';

import { fireEvent, render } from '@testing-library/react-native';

describe('Button component', () => {
  const title = 'button';
  const onPress = jest.fn();
  it('Renders correctly', () => {
    const { getByText } = render(<Button title={title} onPress={onPress} />);
    expect(getByText(title)).toBeTruthy();
  });

  it('Press function works', () => {
    const component = render(<Button title={title} onPress={onPress} />);
    const button = component.getByText(title);
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
