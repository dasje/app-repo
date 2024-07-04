import { findUser } from "@/app/database/repositories/UserRepository";
import { getUserWatchlists } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { fetchAllUserLists } from "@/app/database/repositories/WatchlistUserMapRepository";

export async function POST(req: Request) {
  var userWatchlistItems;
  try {
    const { userEmail } = getUserWatchlists.parse(await req.json());

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
