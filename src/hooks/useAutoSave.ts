import { useCallback, useRef, useState } from "react";
import { Editor } from "@tiptap/react";

import { updateDocument } from "@/src/lib/api/document.api";
import { savePendingDocument } from "../offline-sync/queue";

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

        if (!navigator.onLine) {

    await savePendingDocument({
        documentId,
        title,
        content: editor.getJSON(),
        updatedAt: Date.now(),
    });

    setStatus("saved");

    return;
}
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