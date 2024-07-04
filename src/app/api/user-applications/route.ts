import { NextResponse } from "next/server";
import { userEmailSchema } from "@/app/lib/schemas/available-apps-schema";
import { findAppAccess } from "@/app/database/repositories/AppAccessRepository";
import { findUser } from "@/app/database/repositories/UserRepository";

export async function POST(req: Request) {
  var userApps;

  try {
    const { userEmail } = userEmailSchema.parse(await req.json());
    const user_id = (await findUser({ email: userEmail })).id;
    userApps = await findAppAccess({ user_id: user_id });
  } catch (error: any) {
    console.log("Error in user-applications route.");

    if (error.code === "ER_TOO_MANY_USER_CONNECTIONS") {
      console.log("Too many connections error.");
      return Response.json(
        {
          message: error.message,
        },
        { status: 503 }
      );
    }

    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
  console.log("Success in user-applications route", userApps);

  return Response.json({ apps: userApps }, { status: 200 });
}
