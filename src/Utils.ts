import { ISort } from './types/Sort';
interface ISortOption {
  label: string;
  value: ISort;
}
export const sortOptions: ISortOption[] = [
  {
    label: 'Newest',
    value: { sortBy: 'created', sortDirection: 'desc' },
  },
  {
    label: 'Oldest',
    value: { sortBy: 'created', sortDirection: 'asc' },
  },
  {
    label: 'Most commented',
    value: { sortBy: 'comments', sortDirection: 'desc' },
  },
  {
    label: 'Least commented',
    value: { sortBy: 'comments', sortDirection: 'asc' },
  },
];
