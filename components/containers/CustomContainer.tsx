import { ColorFilterSelect } from "@/components/input/ColorFilterSelect";
import { SortSelect } from "@/components/input/SortSelect";
import { AddNote } from "@/components/modals/AddNote";

export const CustomContainer = () => {
  return (
    <div className="w-screen h-[10%] flex flex-row justify-between items-center p-4 border-b border-b-foreground/10 text-neutral-400">
      <div className="flex flex-row gap-8">
        <div className="flex flex-row items-center gap-4 whitespace-nowrap text-foreground">
          Filter By
          <ColorFilterSelect />
        </div>
        <div className="flex flex-row items-center gap-4 whitespace-nowrap text-foreground">
          Sort By
          <SortSelect />
        </div>
      </div>
      <AddNote />
    </div>
  );
};
