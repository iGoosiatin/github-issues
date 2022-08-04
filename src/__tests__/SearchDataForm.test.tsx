import React from 'react';
import SearchDataForm from '../components/Forms/SearchDataForm';

import { fireEvent, render, waitFor } from '@testing-library/react-native';

describe('Search Data Form component', () => {
  const onSubmit = jest.fn();
  const userPlaceholder = 'User...';
  const repoPlaceholder = 'Repo...';

  it('Renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchDataForm onSubmit={onSubmit} />);
    expect(getByPlaceholderText(userPlaceholder)).toBeTruthy();
    expect(getByPlaceholderText(repoPlaceholder)).toBeTruthy();
  });

  it('Does NOT submit without inputs', async () => {
    const { getByText, getAllByText } = render(<SearchDataForm onSubmit={onSubmit} />);
    const submitButton = getByText('submit');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getAllByText('is required', { exact: false }).length).toBe(2);
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it('Does NOT submit with improper inputs', async () => {
    const { getByText, getByPlaceholderText } = render(<SearchDataForm onSubmit={onSubmit} />);
    const submitButton = getByText('submit');

    const userInput = getByPlaceholderText(userPlaceholder);
    const repoInput = getByPlaceholderText(repoPlaceholder);

    const improperUser = 'Us'; // Too short
    const improperRepo = 'Rr12*'; // Container invalid symbol *

    fireEvent.changeText(userInput, improperUser);
    fireEvent.changeText(repoInput, improperRepo);

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText('at least 3 characters', { exact: false })).toBeTruthy();
      expect(getByText('alphanumeric with dashes', { exact: false })).toBeTruthy();
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it('Submits with proper inputs', async () => {
    const { getByText, getByPlaceholderText } = render(<SearchDataForm onSubmit={onSubmit} />);
    const submitButton = getByText('submit');

    const userInput = getByPlaceholderText(userPlaceholder);
    const repoInput = getByPlaceholderText(repoPlaceholder);

    const correctUser = 'user';
    const correctRepo = 'repo';

    fireEvent.changeText(userInput, correctUser);
    fireEvent.changeText(repoInput, correctRepo);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({ user: correctUser, repo: correctRepo });
    });
  });
});
