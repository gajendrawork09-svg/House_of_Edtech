import { z } from "zod";
import { Permission } from "../generated/prisma/browser";

export const shareDocumentSchema = z.object({
  email: z.string().email(),
  permission: z.nativeEnum(Permission),
});

export type ShareDocumentInput = z.infer<
  typeof shareDocumentSchema
>;