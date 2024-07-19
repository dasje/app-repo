import { findInviteDetails } from "@/app/database/repositories/UserConnectionsRepository";
import { findUser } from "@/app/database/repositories/UserRepository";

type Params = {
  email: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const userEmail = context.params.email;
  console.log("Fetching user: ", userEmail);
  var items;
  try {
    items = await findUser({ email: userEmail });
    console.log("FOUND USER ", items);
  } catch (error: any) {
    console.log("Error in find-user route.");
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
  console.log("Success in find-user route", items);
  if (!items) {
    Response.json({ message: items }, { status: 400 });
  }
  return Response.json({ message: items }, { status: 200 });
}
