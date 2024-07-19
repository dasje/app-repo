import { findAppAccess } from "@/app/database/repositories/AppAccessRepository";
import { findUser } from "@/app/database/repositories/UserRepository";

type Params = {
  user_email: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const userEmail = context.params.user_email;

  var userApps;

  try {
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

  return Response.json(userApps);
}
