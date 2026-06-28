import prisma from "../lib/prisma";
import { Permission } from "../generated/prisma/enums";

export class DocumentShareRepository {

  async findShare(
    documentId: string,
    userId: string
  ) {
    return prisma.documentShare.findUnique({
      where: {
        documentId_userId: {
          documentId,
          userId,
        },
      },
    });
  }

  async shareDocument(
    documentId: string,
    userId: string,
    permission: Permission
  ) {
    return prisma.documentShare.create({
      data: {
        documentId,
        userId,
        permission,
      },
    });
  }

  async updatePermission(
    documentId: string,
    userId: string,
    permission: Permission
  ) {
    return prisma.documentShare.update({
      where: {
        documentId_userId: {
          documentId,
          userId,
        },
      },
      data: {
        permission,
      },
    });
  }
 async getSharedDocuments(userId: string) {
    return prisma.documentShare.findMany({
      where: {
        userId,
      },
      select: {
        permission: true,
        document: {
          select: {
            id: true,
            title: true,
            updatedAt: true,
            owner: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        document: {
          updatedAt: "desc",
        },
      },
    });
  }
}

