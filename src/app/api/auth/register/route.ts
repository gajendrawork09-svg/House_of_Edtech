import { registerSchema } from "../../../../schemas/user.schema";
import UserService from "@/src/services/user.service";
import { NextRequest, NextResponse } from "next/server";


const userService = new UserService();

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const data = registerSchema.parse(body);

    const user =
      await userService.register(data);

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: user,
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