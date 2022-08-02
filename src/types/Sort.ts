export type SortByType = 'created' | 'comments';
export type SortDirectionType = 'desc' | 'asc';

export interface ISort {
  sortBy: SortByType;
  sortDirection: SortDirectionType;
}
