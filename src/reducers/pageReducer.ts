export interface IPageReducerState {
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  lastPage: number;
}

export interface IPageReducerAction {
  type: 'SET_PAGE' | 'SET_LAST_PAGE';
  payload: number;
}

export default function pageReducer(state: IPageReducerState, action: IPageReducerAction): IPageReducerState {
  switch (action.type) {
    case 'SET_PAGE': {
      return {
        ...state,
        currentPage: action.payload,
        previousPage: action.payload - 1 > 0 ? action.payload - 1 : null,
        nextPage: action.payload + 1 <= state.lastPage ? action.payload + 1 : null,
      };
    }
    case 'SET_LAST_PAGE': {
      return {
        ...state,
        lastPage: action.payload,
        nextPage: state.currentPage < action.payload ? state.currentPage + 1 : null,
      };
    }
    default: {
      return { ...state };
    }
  }
}
