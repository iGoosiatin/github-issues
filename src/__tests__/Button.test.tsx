import React from 'react';
import Button from '../components/Button';

import { fireEvent, render } from '@testing-library/react-native';

describe('Button component', () => {
  it('renders correctly', () => {
    const onPress = jest.fn();
    const component = render(<Button title="Button" onPress={onPress} />);
    const button = component.getByRole('button');
    expect(button).toBeTruthy();
  });

  it('press function works', () => {
    const onPress = jest.fn();
    const component = render(<Button title="Button" onPress={onPress} />);
    const button = component.getByRole('button');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
