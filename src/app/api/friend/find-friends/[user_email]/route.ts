import {
  findUserConnections,
  findUserFriendDetails,
} from "@/app/database/repositories/UserConnectionsRepository";
import { findUser } from "@/app/database/repositories/UserRepository";

type Params = {
  user_email: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const userEmail = context.params.user_email;
  var items;
  try {
    const userId = (
      await findUser({
        email: userEmail,
      })
    ).id;
    items = await findUserFriendDetails(userId);
  } catch (error: any) {
    console.log("Error in find-friends route.");
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
  console.log("Success in find-friends route");
  return Response.json({ message: items }, { status: 200 });
}
