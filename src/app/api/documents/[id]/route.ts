import { auth } from "@/src/auth";
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