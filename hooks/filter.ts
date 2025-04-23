import { useContext } from "react";
import { FilterContext } from "@/providers/state-provider";

export function useFilterState() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterState must be within a filter state");
  }
  return context;
}
