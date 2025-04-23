import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons/PlusIcon";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/input/ColorPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api-client";
import { badge_enum } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";

export const AddNote = () => {
  const queryClient = useQueryClient();

  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState<badge_enum>(badge_enum.gray);

  const mutation = useMutation({
    mutationFn: (data: { title: string; badge: badge_enum }) =>
      apiClient.addNote(data.title, data.badge),

    onMutate: async (newNote) => {
      setTitle("");
      setOpen(false);
      setBadge(badge_enum.gray);
      await queryClient.cancelQueries({ queryKey: ["getNotes"] });

      const previousData = queryClient.getQueryData<{
        data: any[];
        error: any;
      }>(["getNotes"]);

      const now = new Date();
      const optimisticNote = {
        note_id: `temp-${Date.now()}`,
        title: newNote.title,
        badge: newNote.badge,
        updated_at: now.toISOString(),
        days_since_update: 0,
        formatted_date: `${now.getDate().toString().padStart(2, "0")}/${(
          now.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${now.getFullYear()}`,
        formatted_time: `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
      };

      queryClient.setQueryData<{ data: any[]; error: any }>(
        ["getNotes"],
        (old) => {
          if (!old) return { data: [optimisticNote], error: null };

          return {
            ...old,
            data: [optimisticNote, ...(old.data || [])],
          };
        },
      );

      return { previousData };
    },

    onError: (err, newNote, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["getNotes"], context.previousData);
      }
      toast.error("Something went wrong. Please try again.");
      setDisabled(false);
    },

    onSuccess: () => {
      setDisabled(false);
      toast.success("Note Added Successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) return;
    setDisabled(true);
    mutation.mutate({ title, badge });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orange-600 text-white hover:text-white hover:bg-orange-700 flex flex-row gap-2"
        >
          <PlusIcon /> New Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Set Up your New Note</DialogTitle>
        </DialogHeader>
        <Label>Title</Label>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <Label>Tag</Label>
        <ColorPicker value={badge} setBadge={setBadge} />
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Create Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
