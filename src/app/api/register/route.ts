import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
// import prisma from "@/prisma/prisma";
import { createUserSchema } from "@/app/lib/schemas/user-schema";
import { ZodError } from "zod";
import { createUser } from "@/app/database/repositories/UserRepository";
import { encryptPassword } from "@/app/lib/auth/passwordAuthentication";

export async function POST(req: Request) {
  try {
    const { name, email, password, passwordConfirm } = createUserSchema.parse(
      await req.json()
    );

    const hashedPassword = encryptPassword(password);

    const user = await createUser({
      name,
      email: email.toLowerCase(),
      emailVerified: new Date(),
      hashedPassword: hashedPassword,
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
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
