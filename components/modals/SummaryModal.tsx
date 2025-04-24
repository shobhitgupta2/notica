"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SummaryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  text: string;
}

export const SummaryModal = ({
  isOpen,
  onOpenChange,
  text,
}: SummaryModalProps) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  if (isOpen && text && !loading && !summary) {
    generateSummary();
  }

  async function generateSummary() {
    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setSummary((prev) => prev + chunk);
      }
    } catch (error) {
      setSummary("Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setSummary("");
      setLoading(false);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notica AI-Powered Summary</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {loading && !summary ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{summary}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
