"use client";

import { NoteGridCard } from "@/components/cards/NoteGridCard";
import { CustomContainer } from "@/components/containers/CustomContainer";
import { NotesContainer } from "@/components/containers/NotesContainer";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/api-client";
import { useSortState } from "@/hooks/sort";
import { useFilterState } from "@/hooks/filter";
import { filter, layout, sort } from "@/types/types";
import { useLayoutState } from "@/hooks/layout";
import { NoteListCard } from "@/components/cards/NoteListCard";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["getNotes"],
    queryFn: apiClient.getNotes,
    staleTime: 60000 * 10,
  });

  const notes = data?.data || [];

  const { sortState } = useSortState();
  const { filterState } = useFilterState();

  const sortedNotes =
    sortState === sort.latest ? notes : [...(notes || [])].reverse();

  const filteredNotes =
    filterState === filter.all
      ? sortedNotes
      : sortedNotes.filter((note) => note.badge === filterState);

  const { layoutState } = useLayoutState();

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        <CustomContainer />
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Empty state
  else if (filteredNotes.length === 0) {
    return (
      <div className="w-full h-full flex flex-col">
        <CustomContainer />
        <div className="w-full col-span-full flex justify-center items-center min-h-[50vh]">
          <div className="text-3xl text-center text-neutral-400">
            Uh oh, no notes here. <br />
            Add them now!
          </div>
        </div>
      </div>
    );
  } else if (layoutState === layout.grid) {
    return (
      <>
        <div className="w-full h-full flex flex-col">
          <CustomContainer />
          <NotesContainer>
            {filteredNotes.map((note: any) => (
              <NoteGridCard
                key={note.note_id}
                id={note.note_id}
                title={note.title}
                badge={note.badge}
                days={note.days_since_update}
                formatted_time={note.formatted_time}
                formatted_date={note.formatted_date}
              />
            ))}
          </NotesContainer>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full h-full flex flex-col">
          <CustomContainer />
          <NotesContainer>
            {filteredNotes.map((note: any) => (
              <NoteListCard
                key={note.note_id}
                id={note.note_id}
                title={note.title}
                badge={note.badge}
                days={note.days_since_update}
                formatted_time={note.formatted_time}
                formatted_date={note.formatted_date}
              />
            ))}
          </NotesContainer>
        </div>
      </>
    );
  }
}
