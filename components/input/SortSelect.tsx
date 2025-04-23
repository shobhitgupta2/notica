import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSortState } from "@/hooks/sort";
import { sort } from "@/types/types";

export const SortSelect = () => {
  const { sortState, setSortState } = useSortState();

  const handleChange = (value: string) => {
    setSortState(value as sort);
  };

  return (
    <Select value={sortState} onValueChange={handleChange}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={sort.latest}>Most Recently Edited</SelectItem>
        <SelectItem value={sort.oldest}>Least Recently Edited</SelectItem>
      </SelectContent>
    </Select>
  );
};
