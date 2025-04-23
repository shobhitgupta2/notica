import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/input/ColorPicker";
import { badge_enum } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api-client";
import { toast } from "sonner";

interface NoteModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultTitle: string;
  defaultBadge: badge_enum;
  id: string;
}

export const NoteModal = ({
  isOpen,
  setOpen,
  defaultTitle,
  defaultBadge,
  id,
}: NoteModalProps) => {
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

  const defaultText = data;

  const [badge, setBadge] = useState<badge_enum>(defaultBadge);
  const [title, setTitle] = useState<string>(defaultTitle);
  const [text, setText] = useState<string>(defaultText);

  const mutation = useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      badge: badge_enum;
      text: string;
    }) => apiClient.updateNote(data.id, data.title, data.badge, data.text),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      setOpen(false);
      toast.success("Changes Saved");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="p-4">
          <DialogTitle>
            <Input
              required
              defaultValue={title}
              className="text-2xl"
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogTitle>
        </DialogHeader>
        <Textarea
          value={text || ""}
          className="resize-none w-full h-[36rem] overflow-y-auto"
          onChange={(e) => setText(e.target.value)}
        />
        <DialogFooter>
          <div className="w-full h-full flex flex-row justify-between">
            <ColorPicker value={badge} setBadge={setBadge} />
            <Button
              type="button"
              variant="outline"
              onClick={() => mutation.mutate({ id, title, badge, text })}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
