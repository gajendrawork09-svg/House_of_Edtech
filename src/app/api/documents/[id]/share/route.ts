
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/src/auth";
import { shareDocumentSchema } from "@/src/schemas/document-share.schema";
import { DocumentShareService } from "@/src/services/documents_share.service";

const documentShareService = new DocumentShareService();

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
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

    const { id: documentId } = await params;

    const body = await request.json();

    const data = shareDocumentSchema.parse(body);

    await documentShareService.shareDocument(
      session.user.id,
      documentId,
      data
    );

    return NextResponse.json(
      {
        success: true,
        message: "Document shared successfully.",
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
