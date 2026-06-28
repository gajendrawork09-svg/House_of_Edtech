import { auth } from "@/src/auth";
import { DocumentShareService } from "@/src/services/documents_share.service";

import { NextResponse } from "next/server";

const documentShareService = new DocumentShareService();

export async function GET() {
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

    const documents =
      await documentShareService.getSharedDocuments(
        session.user.id
      );

    return NextResponse.json(
      {
        success: true,
        data: documents,
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
        status: 500,
      }
    );
  }
}