import { ColorFilterSelect } from "@/components/input/ColorFilterSelect";
import { SortSelect } from "@/components/input/SortSelect";
import { AddNote } from "@/components/modals/AddNote";

export const CustomContainer = () => {
  return (
    <div className="w-full border-b border-b-foreground/10 text-neutral-400">
      {/* Mobile view - stacked but maintaining left-right */}
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

      {/* Desktop view - original layout */}
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
        <AddNote />
      </div>
    </div>
  );
};
