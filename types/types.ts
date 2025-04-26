import { Dispatch, ReactNode, SetStateAction } from "react";

export enum badge_enum {
  gray = "gray",
  red = "red",
  green = "green",
  blue = "blue",
  orange = "orange",
}

export enum sort {
  latest = "latest",
  oldest = "oldest",
}

export enum filter {
  all = "all",
  gray = "gray",
  red = "red",
  green = "green",
  blue = "blue",
  orange = "orange",
}

export enum layout {
  grid = "grid",
  list = "list",
}

export interface FilterContextType {
  filterState: filter;
  setFilterState: (state: filter) => void;
}

export interface SortContextType {
  sortState: sort;
  setSortState: (state: sort) => void;
}

export interface LayoutContextType {
  layoutState: layout;
  setLayoutState: (state: layout) => void;
}

export interface NotesContainerProps {
  children?: React.ReactNode;
}

export interface NoteModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultTitle: string;
  defaultBadge: badge_enum;
  id: string;
}

export interface SummaryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  text: string;
}

export interface ColorPickerProps {
  value: badge_enum;
  setBadge: Dispatch<SetStateAction<badge_enum>>;
}

export interface ColorTagProp {
  color?: string;
}

export interface TanstackProviderProps {
  children: ReactNode;
}

export interface NoteCardProps {
  title: string;
  badge: badge_enum;
  id: string;
  days: number;
  formatted_date: string;
  formatted_time: string;
}

export interface StateProviderProps {
  children?: ReactNode;
}
