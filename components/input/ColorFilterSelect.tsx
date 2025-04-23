import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorTag } from "@/components/icons/ColorTag";
import { useFilterState } from "@/hooks/filter";
import { filter } from "@/types/types";

export const ColorFilterSelect = () => {
  const { filterState, setFilterState } = useFilterState();

  const handleChange = (value: string) => {
    setFilterState(value as filter);
  };

  return (
    <Select value={filterState} onValueChange={handleChange}>
      <SelectTrigger className="w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-14">
        <SelectItem value={filter.all}>All Tags</SelectItem>
        <SelectItem value={filter.gray}>
          <ColorTag color="badge-gray" />
        </SelectItem>
        <SelectItem value={filter.red}>
          <ColorTag color="badge-red" />
        </SelectItem>
        <SelectItem value={filter.blue}>
          <ColorTag color="badge-blue" />
        </SelectItem>
        <SelectItem value={filter.green}>
          <ColorTag color="badge-green" />
        </SelectItem>
        <SelectItem value={filter.orange}>
          <ColorTag color="badge-orange" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
