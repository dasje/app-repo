import { findUser } from "@/app/database/repositories/UserRepository";
import { updateFriendConnectionSchema } from "@/app/lib/schemas/user-schema";
import {
  createUserConnection,
  findUserConnections,
  updateUserConnection,
} from "@/app/database/repositories/UserConnectionsRepository";
import { NewUserConnection, UpdateUserConnection } from "@/app/database/types";

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
    console.log("USER", userId);
    const friendId = (await findUser({ email: friendEmail })).id;
    console.log("FRIEND", friendId);
    const connection = await findUserConnections({
      user_id: userId,
      invite_code: inviteCode,
    });
    console.log(connection);
    if (connection[0].connected === 1) {
      return Response.json({
        message: "Connection already exists.",
        status: 409,
      });
    } else {
      const connectionId = connection[0].id;

      const invitedate = new Date(inviteDate);
      const connectiondate = new Date(connectionDate);

      let updateBody: UpdateUserConnection = {
        user_id: userId,
        friend_id: friendId,
        invite_code: inviteCode,
        connected: connected,
        //   invite_date: invitedate,
        connection_date: connectiondate,
      };
      updatedItem = await updateUserConnection(connectionId, updateBody);

      let newConnectionBody: NewUserConnection = {
        user_id: friendId,
        friend_id: userId,
        invite_code: inviteCode,
        connected: 1,
        invite_date: inviteDate,
        connection_date: connectionDate,
      };
      await createUserConnection(newConnectionBody);
    }
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
  return Response.json({ friends: updatedItem }, { status: 201 });
}
