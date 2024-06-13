"use client";

import { Dispatch, PropsWithChildren, ReactNode, createContext, useReducer } from "react";

const initialState: SearchParamsType = {};

export const SearchContext = createContext(initialState);
export const SearchDispatchContext = createContext<Dispatch<SearchAction>>(
  () => {}
);

export function SearchProvider({ children }: PropsWithChildren) {
  const [search, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={search}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

const searchReducer = (search: SearchParamsType, action: SearchAction) => {
  switch (action.type) {
    case "COMMIT_SEARCH_PARAMS": {
      return action.payload;
    }
  }
};

export type SearchParamsType = {
  term?: string | null;
  sort?: "relevance" | "price,asc" | "price,desc" | null;
  isLocal?: boolean | null;
  isPeak?: boolean | null;
  brands?: string[] | null;
  categories?: number[] | null;
};

type SearchAction = {
  type: "COMMIT_SEARCH_PARAMS";
  payload: SearchParamsType;
};
