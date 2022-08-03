import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import PaginationButton from './PaginationButton';

interface PaginationControlsProps {
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  lastPage: number;
  setPage: (page: number | null) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({ currentPage, previousPage, nextPage, lastPage, setPage }) => {
  if (lastPage === 1) {
    return null;
  }

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <PaginationButton title="<" disabled={previousPage === null ? true : false} setCurrent={() => setPage(previousPage)} />
      {pages.map((page) => (
        <PaginationButton key={page} title={page.toString()} current={page === currentPage} setCurrent={() => setPage(page)} />
      ))}
      <PaginationButton title=">" disabled={nextPage === null ? true : false} setCurrent={() => setPage(nextPage)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PaginationControls;

export const MemoizedPaginationControls = memo(PaginationControls);
