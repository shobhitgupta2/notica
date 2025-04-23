"use client";

import { NoteCard } from "@/components/cards/NoteCard";
import { CustomContainer } from "@/components/containers/CustomContainer";
import { NotesContainer } from "@/components/containers/NotesContainer";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/api-client";
import { useSortState } from "@/hooks/sort";
import { useFilterState } from "@/hooks/filter";
import { filter, sort } from "@/types/types";

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

  return (
    <>
      {!isLoading ? (
        <div className="w-full h-full flex flex-col">
          <CustomContainer />
          <NotesContainer>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note: any) => (
                <NoteCard
                  key={note.note_id}
                  id={note.note_id}
                  title={note.title}
                  badge={note.badge}
                  days={note.days_since_update}
                  formatted_time={note.formatted_time}
                  formatted_date={note.formatted_date}
                />
              ))
            ) : (
              <div className="w-full col-span-full flex justify-center items-center min-h-[50vh]">
                <div className="text-3xl text-center text-neutral-400">
                  Uh oh, no notes here. <br />
                  Add them now!
                </div>
              </div>
            )}
          </NotesContainer>
        </div>
      ) : (
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      )}
    </>
  );
}
