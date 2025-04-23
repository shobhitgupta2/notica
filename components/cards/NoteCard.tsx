"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainIcon } from "@/components/icons/BrainIcon";
import { TrashCanIcon } from "@/components/icons/TrashCanIcon";
import { ColorTag } from "@/components/icons/ColorTag";
import { PencilIcon } from "@/components/icons/PencilIcon";
import { NoteModal } from "@/components/modals/NoteModal";
import { useState } from "react";
import { badge_enum } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api-client";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NoteCardProps {
  title: string;
  badge: badge_enum;
  id: string;
  days: number;
  formatted_date: string;
  formatted_time: string;
}

export const NoteCard = ({
  title,
  badge,
  id,
  days,
  formatted_date,
  formatted_time,
}: NoteCardProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: { id: string }) => apiClient.deleteNote(data.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast.success("Note Deleted");
    },
  });

  return (
    <>
      <Card className="w-full max-w-80">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between text-xl ">
            <div className="truncate pr-4">{title}</div>
            <ColorTag color={`badge-${badge}`} />
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
            onClick={() => mutation.mutate({ id })}
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
    </>
  );
};
