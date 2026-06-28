import { DocumentRepository } from "../repositories/document.repository";
import { CreateDocumentInput, UpdateDocumentInput } from "../schemas/document.schema";

export class DocumentService {
  private repository = new DocumentRepository();

  async createDocument(
    data: CreateDocumentInput,
    ownerId: string
  ) {
    return this.repository.create(data, ownerId);
  }
  async getDocuments(ownerId: string) {
  return this.repository.findAllByOwner(ownerId);
}
async getDocumentById(id: string) {
  const document = await this.repository.findById(id);

  if (!document) {
    throw new Error("Document not found");
  }

  return document;
}
async updateDocument(
  id: string,
  userId: string,
  data: UpdateDocumentInput
) {
  const document =
    await this.repository.canEditDocument(
      id,
      userId
    );

  if (!document) {
    throw new Error(
      "You don't have permission to edit this document."
    );
  }

  return this.repository.update(id, data);
}

}