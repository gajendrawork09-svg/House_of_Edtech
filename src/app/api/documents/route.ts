
import { auth } from "@/src/auth";
import { createDocumentSchema } from "@/src/schemas/document.schema";
import { DocumentService } from "@/src/services/document.service";
import { NextRequest, NextResponse } from "next/server";
const documentService = new DocumentService();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    console.log("Session:", session);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const data = createDocumentSchema.parse(body);
    const userId = session.user.id;
    const document =
      await documentService.createDocument(
        data,
        userId
      );

    return NextResponse.json(
      {
        success: true,
        message: "Document created successfully",
        data: document,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 400,
      }
    );
  }
}