import { useContext } from "react";
import { SortContext } from "@/providers/state-provider";

export function useSortState() {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortState must be within a sort state");
  }
  return context;
}
