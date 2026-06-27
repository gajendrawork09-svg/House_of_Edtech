import prisma from "../lib/prisma";
import { CreateDocumentInput } from "../schemas/document.schema";



export class DocumentRepository {
  async create(
    data: CreateDocumentInput,
    ownerId: string
  ) {
    return prisma.document.create({
      data: {
        title: data.title,
        ownerId,
        // content: null,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  }
}
