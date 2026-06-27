import { DocumentRepository } from "../repositories/document.repository";
import { CreateDocumentInput } from "../schemas/document.schema";

export class DocumentService {
  private repository = new DocumentRepository();

  async createDocument(
    data: CreateDocumentInput,
    ownerId: string
  ) {
    return this.repository.create(data, ownerId);
  }
}