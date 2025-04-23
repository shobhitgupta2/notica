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

export interface FilterContextType {
  filterState: filter;
  setFilterState: (state: filter) => void;
}

export interface SortContextType {
  sortState: sort;
  setSortState: (state: sort) => void;
}
