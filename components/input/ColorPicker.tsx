import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorTag } from "@/components/icons/ColorTag";
import { badge_enum, ColorPickerProps } from "@/types/types";

export const ColorPicker = ({ value, setBadge }: ColorPickerProps) => {
  return (
    <Select
      defaultValue={value}
      onValueChange={(val) => setBadge(val as badge_enum)}
    >
      <SelectTrigger className="w-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-14">
        <SelectItem value="gray">
          <ColorTag color="badge-gray" />
        </SelectItem>
        <SelectItem value="red">
          <ColorTag color="badge-red" />
        </SelectItem>
        <SelectItem value="blue">
          <ColorTag color="badge-blue" />
        </SelectItem>
        <SelectItem value="green">
          <ColorTag color="badge-green" />
        </SelectItem>
        <SelectItem value="orange">
          <ColorTag color="badge-orange" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
