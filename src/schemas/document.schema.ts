import { z } from "zod";

export const createDocumentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100),
});
export const updateDocumentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100),

  content: z.any(),
});

export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type CreateDocumentInput =
  z.infer<typeof createDocumentSchema>;