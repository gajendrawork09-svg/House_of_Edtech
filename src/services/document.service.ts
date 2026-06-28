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
  console.log("Fetching document with ID:", id); // Debugging line
  const document = await this.repository.findById(id);

  if (!document) {
    throw new Error("Document not found");
  }

  return document;
}
async updateDocument(
  id: string,
  ownerId: string,
  data: UpdateDocumentInput
) {
  const result = await this.repository.update(
    id,
    ownerId,
    data
  );

  if (result.count === 0) {
    throw new Error("Document not found");
  }

  return result;
}

}