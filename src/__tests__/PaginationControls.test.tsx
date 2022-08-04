import React from 'react';
import PaginationControls from '../components/Pagination/PaginationControls';

import { fireEvent, render } from '@testing-library/react-native';

describe('Pagination Controls component', () => {
  const setPage = jest.fn();

  it('Renders correctly', () => {
    const currentPage = 1;
    const previousPage = null;
    const nextPage = null;
    const lastPage = 2;
    const { getByText } = render(
      <PaginationControls
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
        lastPage={lastPage}
        setPage={setPage}
      />,
    );
    expect(getByText('<')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('>')).toBeTruthy();
  });

  it('Does NOT render if single page', () => {
    const currentPage = 1;
    const lastPage = 1;
    const previousPage = null;
    const nextPage = null;
    const { queryByText } = render(
      <PaginationControls
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
        lastPage={lastPage}
        setPage={setPage}
      />,
    );
    expect(queryByText('<')).toBeNull();
    expect(queryByText('1')).toBeNull();
    expect(queryByText('>')).toBeNull();
  });

  it('Set page function is called', () => {
    const currentPage = 2;
    const previousPage = 1;
    const nextPage = 3;
    const lastPage = 3;
    const { getByText } = render(
      <PaginationControls
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
        lastPage={lastPage}
        setPage={setPage}
      />,
    );

    fireEvent.press(getByText('<'));
    expect(setPage).lastCalledWith(previousPage);

    fireEvent.press(getByText('>'));
    expect(setPage).lastCalledWith(lastPage);

    for (let page = 1; page <= lastPage; page++) {
      fireEvent.press(getByText(page.toString()));
      if (page === currentPage) {
        expect(setPage).not.lastCalledWith(page);
      } else {
        expect(setPage).lastCalledWith(page);
      }
    }
  });
});
