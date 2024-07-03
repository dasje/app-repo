import { findUser } from "@/app/database/repositories/UserRepository";
import {
  addWatchlistSchema,
  getWatchlistContentSchema,
} from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { createWatchlistList } from "@/app/database/repositories/WatchlistListsRepository";
import { createWatchlistUserMap } from "@/app/database/repositories/WatchlistUserMapRepository";
import { WatchlistListsTable } from "@/app/database/types";
import { findWatchlistContent } from "@/app/database/repositories/WatchlistContentRepository";

export async function POST(req: Request) {
  var items;
  console.log("HERE REQ ", req);
  try {
    const { watchlistId } = getWatchlistContentSchema.parse(await req.json());
    items = await findWatchlistContent({
      watchlist_id: watchlistId,
    });
  } catch (error: any) {
    console.log("Error in watchlist-items route.");
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
  console.log("Success in watchlist-items route", items);
  return Response.json({ message: items }, { status: 200 });
}
