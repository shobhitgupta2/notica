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

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState<badge_enum>(badge_enum.gray);

  const mutation = useMutation({
    mutationFn: (data: { title: string; badge: badge_enum }) =>
      apiClient.addNote(data.title, data.badge),
    onSuccess: async () => {
      setTitle("");
      setOpen(false);
      setBadge(badge_enum.gray);

      await queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast.success("Note Added Successfully");
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) return;
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
          <Button type="submit" variant="outline" onClick={handleSubmit}>
            Create Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
