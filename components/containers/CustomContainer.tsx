import { ColorFilterSelect } from "@/components/input/ColorFilterSelect";
import { SortSelect } from "@/components/input/SortSelect";
import { AddNote } from "@/components/modals/AddNote";
import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLayoutState } from "@/hooks/layout";
import { layout } from "@/types/types";
import { Separator } from "@/components/ui/separator";

export const CustomContainer = () => {
  const { layoutState, setLayoutState } = useLayoutState();

  const handleChange = (value: string) => {
    setLayoutState(value as layout);
  };

  return (
    <div className="w-full border-b border-b-foreground/10 text-neutral-400">
      {/* for desktop */}
      <div className="hidden sm:flex flex-row justify-between items-center p-4">
        <div className="flex flex-row gap-2 md:gap-8">
          <div className="flex flex-row items-center gap-2 md:gap-4 whitespace-nowrap text-foreground">
            Filter By
            <ColorFilterSelect />
          </div>
          <div className="flex flex-row items-center gap-2 md:gap-4 whitespace-nowrap text-foreground">
            Sort By
            <SortSelect />
          </div>
        </div>
        <div className="w-fit h-full flex flex-row gap-4 items-center">
          <ToggleGroup
            type="single"
            value={layoutState}
            onValueChange={handleChange}
          >
            <ToggleGroupItem value="grid">
              <LayoutGrid />
            </ToggleGroupItem>
            <ToggleGroupItem value="list">
              <List />
            </ToggleGroupItem>
          </ToggleGroup>
          <Separator orientation="vertical" className="h-10 mx-2" />
          <AddNote />
        </div>
      </div>
      {/* for mobile */}
      <div className="sm:hidden p-4 space-y-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 text-foreground">
            Filter By
            <ColorFilterSelect />
          </div>
          <AddNote />
        </div>
        <div className="flex items-center gap-2 text-foreground">
          Sort By
          <SortSelect />
        </div>
      </div>
    </div>
  );
};
