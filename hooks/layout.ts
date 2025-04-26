import { useContext } from "react";
import { LayoutContext } from "@/providers/state-provider";

export function useLayoutState() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutState must be within a filter state");
  }
  return context;
}
