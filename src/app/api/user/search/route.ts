import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/src/auth";
import UserService from "@/src/services/user.service";

const userService = new UserService();

export async function GET(request: NextRequest) {
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

    const query =
      request.nextUrl.searchParams.get("query") ?? "";

    const users = await userService.searchUsers(
      query,
      session.user.id
    );

    return NextResponse.json(
      {
        success: true,
        data: users,
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