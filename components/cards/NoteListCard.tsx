import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoteCardProps } from "@/types/types";
import { ColorTag } from "@/components/icons/ColorTag";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BrainIcon } from "@/components/icons/BrainIcon";
import { PencilIcon } from "@/components/icons/PencilIcon";
import { TrashCanIcon } from "@/components/icons/TrashCanIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "@/utils/api-client";
import { toast } from "sonner";
import { NoteModal } from "@/components/modals/NoteModal";
import { SummaryModal } from "@/components/modals/SummaryModal";

export const NoteListCard = ({
  title,
  badge,
  id,
  days,
  formatted_date,
  formatted_time,
}: NoteCardProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);
  const [isSummaryOpen, setSummaryOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["getText", id],
    queryFn: () => apiClient.getTextById(id),
    enabled: false,
  });

  const handleSummariseClick = async () => {
    try {
      const result = await refetch();

      let textToSummarize = "";

      if (typeof result.data === "string") {
        textToSummarize = result.data;
      } else if (result.data && typeof result.data.text === "string") {
        textToSummarize = result.data.text;
      } else if (result.data && typeof result.data.result === "string") {
        textToSummarize = result.data.result;
      } else {
        toast.error("Could not retrieve note content");
        setSummaryOpen(false);
        return;
      }

      if (!textToSummarize.trim()) {
        toast.error("No content to summarize");
        setSummaryOpen(false);
        return;
      }

      const wordCount = textToSummarize
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      if (wordCount <= 30) {
        toast.info("Note is too short to summarize");
        setSummaryOpen(false);
        return;
      }

      setSummaryOpen(true);

      setNoteText(textToSummarize);
    } catch (error) {
      toast.error("Failed to retrieve note content");
      setSummaryOpen(false);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (data: { id: string }) => apiClient.deleteNote(data.id),

    onMutate: async (deleteData) => {
      await queryClient.cancelQueries({ queryKey: ["getNotes"] });

      const previousData = queryClient.getQueryData<{
        data: any[];
        error: any;
      }>(["getNotes"]);

      queryClient.setQueryData<{ data: any[]; error: any }>(
        ["getNotes"],
        (old) => {
          if (!old) return { data: [], error: null };

          return {
            ...old,
            data: old.data.filter((note) => note.note_id !== deleteData.id),
          };
        },
      );

      return { previousData };
    },

    onError: (err, deleteData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["getNotes"], context.previousData);
      }
      toast.error("Something went wrong. Please try again.");
    },

    onSuccess: () => {
      toast.success("Note Deleted Successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
    },
  });

  return (
    <>
      <Card className="w-3/5">
        <CardHeader>
          <CardTitle>
            <div className="w-full h-full flex flex-row justify-between">
              {title}
              <ColorTag color={`badge-${badge}`} />
            </div>
          </CardTitle>
          <CardDescription>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Last Edited: {days} days ago</TooltipTrigger>
                <TooltipContent>
                  <p>
                    {formatted_date} {formatted_time}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="p-2 bg-orange-600 hover:bg-orange-700"
              onClick={handleSummariseClick}
            >
              <BrainIcon />
            </Button>
            <Button
              variant="outline"
              className="p-2 hover:text-orange-500"
              onClick={() => setOpen(true)}
            >
              <PencilIcon />
            </Button>
          </div>
          <Button
            variant="outline"
            className="p-2 hover:text-orange-500"
            onClick={() => deleteMutation.mutate({ id })}
          >
            <TrashCanIcon />
          </Button>
        </CardContent>
      </Card>
      <NoteModal
        isOpen={isOpen}
        setOpen={setOpen}
        defaultBadge={badge}
        defaultTitle={title}
        id={id}
      />
      <SummaryModal
        isOpen={isSummaryOpen}
        onOpenChange={setSummaryOpen}
        title={title}
        text={noteText}
      />
    </>
  );
};
