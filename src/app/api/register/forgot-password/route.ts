import { findUser } from "@/app/database/repositories/UserRepository";
import {
  forgotPasswordSchema,
  inviteFriendSchema,
} from "@/app/lib/schemas/user-schema";
import { createUserConnection } from "@/app/database/repositories/UserConnectionsRepository";
import { randomUUID } from "crypto";
import { createPasswordReset } from "@/app/database/repositories/PasswordResetRepository";
import { sendEmail } from "@/app/lib/handlers/sendNewPasswordRequestEmail";

export async function POST(req: Request) {
  var addedNewPasswordRequest;
  try {
    const { userEmail } = forgotPasswordSchema.parse(await req.json());

    const user = await findUser({ email: userEmail });
    if (!user) {
      return Response.json({
        message: "Email not found.",
        status: 200,
      });
    }

    const requestCode = randomUUID();

    addedNewPasswordRequest = await createPasswordReset({
      user_email: userEmail,
      request_code: requestCode,
    });

    const resetPasswordUrl = `${process.env.NEXT_PUBLIC_URL}/login/forgot-password/reset/${requestCode}`;

    await sendEmail({
      emailTo: userEmail,
      subject: "Reset your password",
      appName: "Badger Apps",
      resetLink: resetPasswordUrl,
    });
  } catch (error: any) {
    console.log("Error in reset-password route.");
    Array.isArray(error) &&
      error.map((i, k) => console.log("Zod error: ", i.message));
    if (error.code === "ER_TOO_MANY_USER_CONNECTIONS") {
      console.log("Too many connections error.");
      return Response.json({
        message: error.message,
        status: 503,
      });
    }
    console.log(error);
    return Response.json({
      message: error.message,
      status: 500,
    });
  }
  console.log("Success in reset-password route");
  return Response.json(
    { message: "Password reset email sent." },
    { status: 201 }
  );
}
