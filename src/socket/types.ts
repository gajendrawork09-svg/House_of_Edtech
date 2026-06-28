export interface JoinDocumentPayload {
  documentId: string;
}

export interface DocumentChangePayload {
  documentId: string;
  content: any;
}

export interface CursorPayload {
  documentId: string;
  userId: string;
  x: number;
  y: number;
}
export interface DocumentChangePayload {
  documentId: string;
  content: any;
}