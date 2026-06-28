import { updateDocument } from "@/src/lib/api/document.api";
import {
  getPendingDocuments,
  removePendingDocument,
} from "./queue";

export async function syncPendingDocuments() {
  const pending = await getPendingDocuments();

  for (const document of pending) {
    try {
      await updateDocument(document.documentId, {
        title: document.title,
        content: document.content,
      });

      await removePendingDocument(document.documentId);

      console.log(
        "Synced:",
        document.documentId
      );
    } catch (error) {
      console.error(error);
    }
  }
}