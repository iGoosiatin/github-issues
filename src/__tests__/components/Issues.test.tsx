import React from 'react';
import Issues from '../../components/Issues';
import { issues } from '../../testData/mockedIssues';
import { ITEMS_PER_PAGE } from '../../Constants';

import { render, waitFor } from '@testing-library/react-native';

describe('Issue component', () => {
  // Mocked fetch to return issues
  (globalThis.fetch as jest.Mock) = jest
    .fn(
      (): Promise<any> =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(issues),
        }),
    )
    .mockImplementationOnce(
      (): Promise<any> =>
        Promise.resolve({
          ok: true,
          // Should give 2 fake pages
          json: () => Promise.resolve({ open_issues_count: ITEMS_PER_PAGE + 1 }),
        }),
    )
    .mockImplementationOnce(
      (): Promise<any> =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(issues),
        }),
    )
    .mockImplementationOnce(
      (): Promise<any> =>
        Promise.resolve({
          ok: true,
          // Should give 2 fake pages
          json: () => Promise.resolve({ open_issues_count: ITEMS_PER_PAGE + 1 }),
        }),
    );
  it('Renders correctly', async () => {
    const screen = await waitFor(() => render(<Issues searchData={{ user: 'user', repo: 'repo' }} />));
    expect(screen).toMatchSnapshot();
  });
});
