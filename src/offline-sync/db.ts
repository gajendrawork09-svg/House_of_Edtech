import { openDB, IDBPDatabase } from "idb";

let db: Promise<IDBPDatabase> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser.");
  }

  if (!db) {
    db = openDB("house-of-edtech", 1, {
      upgrade(database) {
        if (
          !database.objectStoreNames.contains(
            "pending-documents"
          )
        ) {
          database.createObjectStore(
            "pending-documents",
            {
              keyPath: "documentId",
            }
          );
        }
      },
    });
  }

  return db;
}