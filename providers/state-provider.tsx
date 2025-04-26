"use client";

import {
  filter,
  FilterContextType,
  layout,
  LayoutContextType,
  sort,
  SortContextType,
  StateProviderProps,
} from "@/types/types";
import { createContext, useState } from "react";

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);
export const SortContext = createContext<SortContextType | undefined>(
  undefined,
);

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
);

export function StateProvider({ children }: StateProviderProps) {
  const [filterState, setFilterState] = useState<filter>(filter.all);
  const [sortState, setSortState] = useState<sort>(sort.latest);
  const [layoutState, setLayoutState] = useState<layout>(layout.grid);

  return (
    <LayoutContext.Provider value={{ layoutState, setLayoutState }}>
      <FilterContext.Provider value={{ filterState, setFilterState }}>
        <SortContext.Provider value={{ sortState, setSortState }}>
          {children}
        </SortContext.Provider>
      </FilterContext.Provider>
    </LayoutContext.Provider>
  );
}
