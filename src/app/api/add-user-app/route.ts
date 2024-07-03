import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { createUserSchema } from "@/app/lib/schemas/user-schema";
import { ZodError } from "zod";
import { addUserAppSchema } from "@/app/lib/schemas/app-interactivity-schema";
import { findUser } from "@/app/database/repositories/UserRepository";
import { createAppAccess } from "@/app/database/repositories/AppAccessRepository";

export async function POST(req: Request) {
  try {
    const { userEmail, appId } = addUserAppSchema.parse(await req.json());

    const user = await findUser({
      email: userEmail,
    });
    const appAdded = await createAppAccess({ user_id: user.id, app_id: appId });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "fail",
          message: "user with that email already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
