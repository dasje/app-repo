import { findUser } from "@/app/database/repositories/UserRepository";
import { updateFriendConnectionSchema } from "@/app/lib/schemas/user-schema";
import {
  findUserConnections,
  updateUserConnection,
} from "@/app/database/repositories/UserConnectionsRepository";
import { UpdateUserConnection } from "@/app/database/types";

export async function POST(req: Request) {
  var updatedItem;
  try {
    const {
      userEmail,
      friendEmail,
      inviteCode,
      inviteDate,
      connectionDate,
      connected,
    } = updateFriendConnectionSchema.parse(await req.json());

    const userId = (await findUser({ email: userEmail })).id;
    const friendId = (await findUser({ email: friendEmail })).id;
    const connectionId = (
      await findUserConnections({
        user_id: userId,
        invite_code: inviteCode,
      })
    )[0].id;

    const invitedate = new Date(inviteDate);
    const connectiondate = new Date(connectionDate);

    let updateBody: UpdateUserConnection = {
      user_id: userId,
      friend_id: friendId,
      invite_code: inviteCode,
      connected: Number.parseInt(connected),
      invite_date: invitedate,
      connection_date: connectiondate,
    };
    updatedItem = await updateUserConnection(connectionId, updateBody);
  } catch (error: any) {
    console.log("Error in update-friend route.");
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
  console.log("Success in update-friend route", updatedItem);
  return Response.json({ friends: updatedItem });
}
