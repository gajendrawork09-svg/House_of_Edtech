import { Permission } from "../generated/prisma/enums";
import prisma from "../lib/prisma";

export class DocumentShareRepository {
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
}