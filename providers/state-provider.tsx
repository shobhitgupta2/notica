"use client";

import {
  filter,
  FilterContextType,
  sort,
  SortContextType,
} from "@/types/types";
import { createContext, ReactNode, useState } from "react";

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);
export const SortContext = createContext<SortContextType | undefined>(
  undefined,
);

interface StateProviderProps {
  children?: ReactNode;
}

export function StateProvider({ children }: StateProviderProps) {
  const [filterState, setFilterState] = useState<filter>(filter.all);
  const [sortState, setSortState] = useState<sort>(sort.latest);

  return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      <SortContext.Provider value={{ sortState, setSortState }}>
        {children}
      </SortContext.Provider>
    </FilterContext.Provider>
  );
}
