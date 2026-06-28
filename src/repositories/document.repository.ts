import prisma from "../lib/prisma";
import { CreateDocumentInput, UpdateDocumentInput } from "../schemas/document.schema";



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
  async findAllByOwner(ownerId: string) {
  return prisma.document.findMany({
    where: {
      ownerId,
      isArchived: false,
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      updatedAt: true,
    },
  });
}
async findById(id: string) {
  return prisma.document.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
async update(
  id: string,
  data: UpdateDocumentInput
) {
  return prisma.document.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });
}

async canEditDocument(
  documentId: string,
  userId: string
) {
  return prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        {
          ownerId: userId,
        },
        {
          sharedWith: {
            some: {
              userId,
              permission: "EDIT",
            },
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });
}
async findOwnedDocument(
  documentId: string,
  ownerId: string
) {
  return prisma.document.findFirst({
    where: {
      id: documentId,
      ownerId,
    },
  });
}

async hasEditPermission(
  documentId: string,
  userId: string
) {
  return prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        {
          ownerId: userId,
        },
        {
          sharedWith: {
            some: {
              userId,
              permission: "EDIT",
            },
          },
        },
      ],
    },
  });
}

}