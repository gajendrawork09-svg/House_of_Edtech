import { DocumentRepository } from "../repositories/document.repository";
import { DocumentShareRepository } from "../repositories/document_share.repository";
import { UserRepository } from "../repositories/user.repository";
import { ShareDocumentInput } from "../schemas/document-share.schema";

export class DocumentShareService {

  private documentRepository = new DocumentRepository();

  private shareRepository = new DocumentShareRepository();

  private userRepository = new UserRepository();

  async shareDocument(
    ownerId: string,
    documentId: string,
    data: ShareDocumentInput
  ) {

    // Verify ownership
    const document =
      await this.documentRepository.findOwnedDocument(
        documentId,
        ownerId
      );

    if (!document) {
      throw new Error("Document not found or access denied.");
    }

    // Find target user
    const user =
      await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("User not found.");
    }

    // Prevent sharing with yourself
    if (user.id === ownerId) {
      throw new Error("You already own this document.");
    }

    // Check existing share
    const existingShare =
      await this.shareRepository.findShare(
        documentId,
        user.id
      );

    // Update permission if already shared
    if (existingShare) {
      return this.shareRepository.updatePermission(
        documentId,
        user.id,
        data.permission
      );
    }

    // Create new share
    return this.shareRepository.shareDocument(
      documentId,
      user.id,
      data.permission
    );
  }

  async getSharedDocuments(userId: string) {
  const shares = await this.shareRepository.getSharedDocuments(userId);

  return shares.map((share) => ({
    id: share.document.id,
    title: share.document.title,
    updatedAt: share.document.updatedAt,
    permission: share.permission,
    owner: share.document.owner,
  }));
}
}