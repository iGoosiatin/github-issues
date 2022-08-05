import { createContext } from 'react';
import { ISearchData } from './types/SearchData';

interface ISearchDataContext {
  searchData: ISearchData | null;
  setSearchData: any;
}

const initialSearchData = {
  searchData: null,
  setSearchData: () => {},
};

export const SearchDataContext = createContext<ISearchDataContext>(initialSearchData);
