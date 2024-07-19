import { findUser } from "@/app/database/repositories/UserRepository";
import { inviteFriendSchema } from "@/app/lib/schemas/user-schema";
import { createUserConnection } from "@/app/database/repositories/UserConnectionsRepository";
import { randomUUID } from "crypto";
import { sendEmail } from "@/app/lib/handlers/sendInviteEmail";

export async function POST(req: Request) {
  var addedConnection;
  try {
    const { userEmail, friendEmail } = inviteFriendSchema.parse(
      await req.json()
    );

    const user = await findUser({ email: userEmail });
    const friend = await findUser({ email: friendEmail });
    const inviteCode = randomUUID();

    const addFriendUrl = `${process.env.NEXT_PUBLIC_URL}/invite/${inviteCode}`;

    addedConnection = await createUserConnection({
      user_id: user.id,
      friend_id: friend && friend.id,
      friend_email: friendEmail,
      invite_code: inviteCode,
      connected: 0,
    });
    await sendEmail({
      emailTo: friendEmail,
      subject: "Your friend has invited you to Badger Apps",
      invitedByUsername: user.name,
      invitedByEmail: user.email,
      inviteLink: addFriendUrl,
    });
  } catch (error: any) {
    console.log("Error in invite-friend route.");
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
  console.log("Success in invite-friend route", addedConnection);
  return Response.json({ friends: addedConnection });
}
