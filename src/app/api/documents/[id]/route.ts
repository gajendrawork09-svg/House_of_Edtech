import { auth } from "@/src/auth";
import { updateDocumentSchema } from "@/src/schemas/document.schema";
import { DocumentService } from "@/src/services/document.service";
import { NextRequest, NextResponse } from "next/server";

const documentService = new DocumentService();

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const session = await auth();

    if (!session) {
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

    const { id } = await params;

    const document =
      await documentService.getDocumentById(id);

    return NextResponse.json(
      {
        success: true,
        data: document,
      },
      {
        status: 200,
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

export async function PATCH(
  request: NextRequest,
  { params }: RouteProps
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const { id } = await params;

  const body = await request.json();

  const data = updateDocumentSchema.parse(body);

  await documentService.updateDocument(
    id,
    session.user.id,
    data
  );

  return NextResponse.json({
    success: true,
  });
}