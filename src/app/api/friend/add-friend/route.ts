import { findUser } from "@/app/database/repositories/UserRepository";
import { newFriendConnectionSchema } from "@/app/lib/schemas/user-schema";
import { createUserConnection } from "@/app/database/repositories/UserConnectionsRepository";

export async function POST(req: Request) {
  var addedItem;
  try {
    const { userEmail, friendEmail, inviteCode } =
      newFriendConnectionSchema.parse(await req.json());

    const userId = (await findUser({ email: userEmail })).id;
    const friendId = (await findUser({ email: friendEmail })).id;

    addedItem = await createUserConnection({
      user_id: userId,
      friend_id: friendId ? friendId : null,
      invite_code: inviteCode,
      connected: 0,
    });
  } catch (error: any) {
    console.log("Error in add-friend route.");
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
  console.log("Success in add-friend route", addedItem);
  return Response.json({ apps: addedItem });
}
