import { findUser } from "@/app/database/repositories/UserRepository";
import { addWatchlistSchema } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { createWatchlistList } from "@/app/database/repositories/WatchlistListsRepository";
import { createWatchlistUserMap } from "@/app/database/repositories/WatchlistUserMapRepository";
import { WatchlistListsTable } from "@/app/database/types";

export async function POST(req: Request) {
  var addedItem;
  console.log("HERE REQ ", req);
  try {
    const { watchlistName, userEmail } = addWatchlistSchema.parse(
      await req.json()
    );

    const userId = (await findUser({ email: userEmail })).id;
    const createDate = new Date();
    addedItem = await createWatchlistList({
      name: watchlistName,
      created_at: createDate.toISOString(),
      created_by: userId,
    });
  } catch (error: any) {
    console.log("Error in add-new-watchlist route.");
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
  console.log("Success in add-new-watchlist route", addedItem);
  return Response.json({ apps: addedItem });
}
