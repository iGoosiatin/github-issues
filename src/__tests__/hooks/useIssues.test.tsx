import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useIssues } from '../../hooks/useIssues';
import { initialState } from '../../State';
import { sortOptions, filterOptions } from '../../Utils';
import { ITEMS_PER_PAGE } from '../../Constants';

import { issues } from '../../testData/mockedIssues';

describe('useIssues hook', () => {
  // Mocked fetch to return issues
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(issues),
    }),
  ) as jest.Mock;

  const searchData = { user: 'user', repo: 'repo' };

  it('Works as expected', async () => {
    // Mocking Once is required to "fetch" open_issues_count
    (globalThis.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        // Should give 2 fake pages
        json: () => Promise.resolve({ open_issues_count: ITEMS_PER_PAGE + 1 }),
      }),
    );
    const { result } = renderHook(() => useIssues(initialState));
    await waitFor(() => result.current.handleLoadIssues(searchData));

    expect(result.current.state.errorText).toBeFalsy();
    expect(result.current.state.isLoading).toBeFalsy();
    expect(result.current.state.previousPage).toBeNull();
    expect(result.current.state.nextPage).toEqual(2);
    expect(result.current.state.lastPage).toEqual(2);
    expect(result.current.state.issues.length).toEqual(issues.length);

    // Load next page
    act(() => {
      result.current.setPage(result.current.state.nextPage);
    });
    expect(result.current.state.previousPage).toEqual(1);
    expect(result.current.state.currentPage).toEqual(2);
    expect(result.current.state.nextPage).toBeNull();

    // Set page to NULL has no effect
    act(() => {
      result.current.setPage(null);
    });
    expect(result.current.state.previousPage).toEqual(1);
    expect(result.current.state.currentPage).toEqual(2);
    expect(result.current.state.nextPage).toBeNull();

    // Load with sort
    const sortOption = 2; // 2 is index of sortOptions array
    act(() => {
      result.current.onSort(sortOption);
    });
    // On sorted load page is set to 1
    expect(result.current.state.previousPage).toBeNull();
    expect(result.current.state.currentPage).toEqual(1);
    expect(result.current.state.nextPage).toBe(2);
    expect(result.current.state.selectedSortOption).toEqual(sortOption);
    expect(result.current.state.sortBy).toEqual(sortOptions[sortOption].value.sortBy);
    expect(result.current.state.sortDirection).toEqual(sortOptions[sortOption].value.sortDirection);

    // Set filter
    let filterOption = 1; // 1 is index of filterOptions array
    act(() => {
      result.current.onFilter(filterOption);
    });
    expect(result.current.state.selectedFilterOption).toEqual(filterOption);
    expect(result.current.state.filterBy).toEqual(filterOptions[filterOption].value);

    // Reset filter
    filterOption = 0; // default selection
    act(() => {
      result.current.onFilter(filterOption);
    });
    expect(result.current.state.filterBy).toBeNull();
  });

  it('Handles User/Repo not found', async () => {
    const errorText = 'Not Found';
    (globalThis.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        // Should return object with text propery
        json: () => Promise.resolve({ message: errorText }),
      }),
    );
    const { result } = renderHook(() => useIssues(initialState));
    await waitFor(() => result.current.handleLoadIssues(searchData));

    expect(result.current.state.errorText).toContain(errorText);
    expect(result.current.state.issues.length).toEqual(0);
  });

  it('Handles API/URl failure', async () => {
    const errorText = '500 Internal Server Error';
    (globalThis.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(errorText));
    const { result } = renderHook(() => useIssues(initialState));
    await waitFor(() => result.current.handleLoadIssues(searchData));

    expect(result.current.state.errorText).toContain(errorText);
    expect(result.current.state.issues.length).toEqual(0);
  });
});
