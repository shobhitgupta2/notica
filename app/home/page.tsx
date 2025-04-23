"use client";

import { NoteCard } from "@/components/cards/NoteCard";
import { CustomContainer } from "@/components/containers/CustomContainer";
import { NotesContainer } from "@/components/containers/NotesContainer";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/api-client";
import { useSortState } from "@/hooks/sort";
import { useFilterState } from "@/hooks/filter";
import { filter, sort } from "@/types/types";
import PageContainer from "@/components/containers/PageContainer";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["getNotes"],
    queryFn: apiClient.getNotes,
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
        <div className="w-screen h-full flex flex-col">
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
              <PageContainer>
                <span className="text-3xl text-foreground">
                  No notes yet...
                </span>
              </PageContainer>
            )}
          </NotesContainer>
        </div>
      ) : (
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      )}
    </>
  );
}
