import { findUser } from "@/app/database/repositories/UserRepository";
import { fetchAllUserLists } from "@/app/database/repositories/WatchlistUserMapRepository";

type Params = {
  user_email: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const userEmail = context.params.user_email;
  var userWatchlistItems;
  try {
    const userId = (await findUser({ email: userEmail })).id;
    userWatchlistItems = await fetchAllUserLists(userId);
  } catch (error: any) {
    console.log("Error in user-watchlists route.");
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
  console.log("Success in user-watchlists route", userWatchlistItems);
  return Response.json({ message: userWatchlistItems }, { status: 200 });
}
