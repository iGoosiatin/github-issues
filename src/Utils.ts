import { ISelectOption } from './types/Select';
import { ISort } from './types/Sort';
import { FilterType } from './types/Filter';

export const sortOptions: ISelectOption<ISort>[] = [
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

export const filterOptions: ISelectOption<FilterType>[] = [
  {
    label: 'No filters',
    value: null,
  },
  {
    label: 'Issues',
    value: 'issues',
  },
  {
    label: 'Pull Requests',
    value: 'pullRequests',
  },
];
