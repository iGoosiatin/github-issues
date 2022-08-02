import IIssue from '../types/Issue';
import { SortByType, SortDirectionType } from '../types/Sort';
import { sortOptions } from '../Utils';

export interface IIssueReducerState {
  issues: IIssue[];
  sortBy: SortByType;
  sortDirection: SortDirectionType;
  selectedSortOption: number;
}

export interface IIssueReducerAction {
  type: 'SET_ISSUES' | 'SET_SORTING_OPTION';
  payload: any;
}

export default function issueReducer(state: IIssueReducerState, action: IIssueReducerAction): IIssueReducerState {
  switch (action.type) {
    case 'SET_ISSUES': {
      return {
        ...state,
        issues: [...action.payload],
      };
    }
    case 'SET_SORTING_OPTION': {
      return {
        ...state,
        selectedSortOption: action.payload,
        sortBy: sortOptions[action.payload].value.sortBy,
        sortDirection: sortOptions[action.payload].value.sortDirection,
      };
    }
    default: {
      return { ...state };
    }
  }
}
