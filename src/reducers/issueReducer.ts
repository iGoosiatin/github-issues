import IIssue from '../types/Issue';
import { SortByType, SortDirectionType } from '../types/Sort';
import { sortOptions } from '../Utils';

export interface IIssueReducerState {
  issues: IIssue[];
  isLoading: boolean;
  errorText: string;
  sortBy: SortByType;
  sortDirection: SortDirectionType;
  selectedSortOption: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  lastPage: number;
}

type SetIssuesPayload = { issues: IIssue[]; lastPage: number };

type IssueReducerActionType =
  | { type: 'SET_ISSUES'; payload: SetIssuesPayload }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SORTING_OPTION'; payload: number }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ERROR'; payload: string };

export default function issueReducer(state: IIssueReducerState, action: IssueReducerActionType): IIssueReducerState {
  switch (action.type) {
    case 'SET_ISSUES': {
      return {
        ...state,
        issues: [...action.payload.issues],
        isLoading: false,
        errorText: '',
        lastPage: action.payload.lastPage,
        nextPage: state.currentPage < action.payload.lastPage ? state.currentPage + 1 : null,
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        errorText: action.payload,
        isLoading: false,
        issues: [],
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case 'SET_SORTING_OPTION': {
      return {
        ...state,
        selectedSortOption: action.payload,
        sortBy: sortOptions[action.payload].value.sortBy,
        sortDirection: sortOptions[action.payload].value.sortDirection,
        currentPage: 1,
        previousPage: null,
        nextPage: state.lastPage > 1 ? 2 : null,
      };
    }
    case 'SET_PAGE': {
      return {
        ...state,
        currentPage: action.payload,
        previousPage: action.payload - 1 > 0 ? action.payload - 1 : null,
        nextPage: action.payload + 1 <= state.lastPage ? action.payload + 1 : null,
      };
    }
    default: {
      return { ...state };
    }
  }
}
