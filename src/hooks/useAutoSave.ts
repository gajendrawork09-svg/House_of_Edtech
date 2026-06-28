import { useCallback, useRef, useState } from "react";
import { Editor } from "@tiptap/react";

import { updateDocument } from "@/src/lib/api/document.api";

export type SaveStatus =
  | "saved"
  | "saving"
  | "error";

interface UseAutoSaveProps {
  documentId: string;
  title: string;
  editor: Editor | null;
}

export const useAutoSave = ({
  documentId,
  title,
  editor,
}: UseAutoSaveProps) => {
  const [status, setStatus] =
    useState<SaveStatus>("saved");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSave = useCallback(() => {
    if (!editor) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setStatus("saving");

        await updateDocument(documentId, {
          title,
          content: editor.getJSON(),
        });

        setStatus("saved");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }, 1000);
  }, [documentId, title, editor]);

  return {
    status,
    triggerSave,
  };
};