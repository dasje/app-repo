import { findInviteDetails } from "@/app/database/repositories/UserConnectionsRepository";

type Params = {
  invite_code: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const inviteCode = context.params.invite_code;
  console.log("Fetching invite code: ", inviteCode);
  var items;
  try {
    items = await findInviteDetails(inviteCode);
  } catch (error: any) {
    console.log("Error in friends/find-invite route.");
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
  console.log("Success in friends/find-invite route", items);
  return Response.json({ message: items }, { status: 200 });
}
