import { getDB} from "./db";
import { PendingDocument } from "./types";

const STORE = "pending-documents";

export async function savePendingDocument(
  document: PendingDocument
) {
  const db = await getDB();

  await db.put(STORE, document);
}

export async function getPendingDocuments() {
  const db = await getDB();

  return db.getAll(STORE);
}

export async function removePendingDocument(
  documentId: string
) {
  const db = await getDB();

  await db.delete(STORE, documentId);
}