import {
  findUser,
  updateUser,
} from "@/app/database/repositories/UserRepository";
import { resetPasswordSchema } from "@/app/lib/schemas/user-schema";
import {
  encryptPassword,
  verifyPassword,
} from "@/app/lib/handlers/auth_handlers/passwordAuthentication";

export async function POST(req: Request) {
  try {
    const { userEmail, newPassword } = resetPasswordSchema.parse(
      await req.json()
    );
    const user = await findUser({ email: userEmail });

    if (verifyPassword(user.hashedPassword, newPassword)) {
      console.log("User requested same password.");
      return Response.json(
        { message: "same_password" },
        {
          status: 202,
        }
      );
    } else {
      const newEncryptedPassword = encryptPassword(newPassword);
      await updateUser(user.id, {
        hashedPassword: newEncryptedPassword,
      });
      console.log("password changed");
    }
  } catch (error: any) {
    console.log("Error in request-reset route.");
    Array.isArray(error) &&
      error.map((i, k) => console.log("Zod error: ", i.message));
    if (error.code === "ER_TOO_MANY_USER_CONNECTIONS") {
      console.log("Too many connections error.");
      return Response.json(
        {
          message: error.message,
        },
        { status: 503 }
      );
    }
    console.log(error);
    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
  console.log("Success in request-reset route");
  return Response.json({ status: 200 });
}
