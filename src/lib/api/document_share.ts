
import { ShareDocumentInput } from "@/src/schemas/document-share.schema";

export const shareDocument = async (
  documentId: string,
  body: ShareDocumentInput
) => {
  const response = await fetch(
    `/api/documents/${documentId}/share`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

