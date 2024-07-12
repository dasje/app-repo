import { findUserConnections } from "@/app/database/repositories/UserConnectionsRepository";

type Params = {
  invite_code: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const inviteCode = context.params.invite_code;
  var items;
  try {
    items = await findUserConnections({
      invite_code: inviteCode,
    });
  } catch (error: any) {
    console.log("Error in friends/find-invite route.");
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
  console.log("Success in friends/find-invite route", items);
  return Response.json({ message: items }, { status: 200 });
}
