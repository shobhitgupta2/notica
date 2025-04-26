import { useLayoutState } from "@/hooks/layout";
import { layout, NotesContainerProps } from "@/types/types";

export const NotesContainer = ({ children }: NotesContainerProps) => {
  const { layoutState } = useLayoutState();

  if (layoutState === layout.grid) {
    return (
      <div className="w-full grid grid-auto-fill items-start p-4 gap-x-16 gap-y-8 overflow-y-auto place-items-center">
        {children}
      </div>
    );
  } else if (layoutState === layout.list) {
    return (
      <div className="w-full flex flex-col justify-start items-center gap-4 p-4 overflow-y-auto">
        {children}
      </div>
    );
  }
};
