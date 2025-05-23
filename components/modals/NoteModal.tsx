import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/input/ColorPicker";
import { badge_enum, NoteModalProps } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api-client";
import { toast } from "sonner";

export const NoteModal = ({
  isOpen,
  setOpen,
  defaultTitle,
  defaultBadge,
  id,
}: NoteModalProps) => {
  const [badge, setBadge] = useState<badge_enum>(defaultBadge);
  const [title, setTitle] = useState<string>(defaultTitle);
  const [text, setText] = useState<string>("");

  const wordCount = text?.trim() ? text.trim().split(/\s+/).length : 0;

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["getText", id],
    queryFn: () => apiClient.getTextById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setText(data);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      badge: badge_enum;
      text: string;
    }) => apiClient.updateNote(data.id, data.title, data.badge, data.text),

    onMutate: async (updatedNote) => {
      await queryClient.cancelQueries({ queryKey: ["getNotes"] });

      const previousData = queryClient.getQueryData<{
        data: any[];
        error: any;
      }>(["getNotes"]);

      const now = new Date();

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      const formatted_date = `${day}/${month}/${year}`;

      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const formatted_time = `${hours}:${minutes}:${seconds}`;

      queryClient.setQueryData<{ data: any[]; error: any }>(
        ["getNotes"],
        (old) => {
          if (!old) return { data: [], error: null };

          return {
            ...old,
            data: old.data.map((note) =>
              note.note_id === updatedNote.id
                ? {
                    ...note,
                    title: updatedNote.title,
                    badge: updatedNote.badge,
                    updated_at: now.toISOString(),
                    days_since_update: 0,
                    formatted_date,
                    formatted_time,
                  }
                : note,
            ),
          };
        },
      );

      if (updatedNote.text !== undefined) {
        queryClient.setQueryData(
          ["getNoteText", updatedNote.id],
          updatedNote.text,
        );
      }

      return { previousData };
    },

    onError: (err, updatedNote, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["getNotes"], context.previousData);
      }
      toast.error("Something went wrong. Please try again.");
    },

    onSuccess: () => {
      toast.success("Note Saved Successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl w-full overflow-hidden flex flex-col">
        <DialogHeader className="p-4 shrink-0 flex gap-4">
          <DialogTitle>
            <Input
              required
              defaultValue={title}
              className="text-2xl"
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 p-1 gap-4 flex-col flex">
          <DialogDescription>Word Count: {wordCount}</DialogDescription>
          <Textarea
            value={text || ""}
            className="resize-none w-full h-48 md:h-64 lg:h-80"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <DialogFooter className="mt-2 shrink-0">
          <div className="w-full h-full flex flex-row justify-between">
            <ColorPicker value={badge} setBadge={setBadge} />
            <Button
              type="button"
              variant="outline"
              onClick={() => saveMutation.mutate({ id, title, badge, text })}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
