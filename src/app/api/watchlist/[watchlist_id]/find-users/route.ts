import { findInviteDetails } from "@/app/database/repositories/UserConnectionsRepository";
import {
  findWatchlistUserMappings,
  findWatchlistUsers,
} from "@/app/database/repositories/WatchlistUserMapRepository";

type Params = {
  watchlist_id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const watchlistId = context.params.watchlist_id;
  console.log("Fetching users for watchlist with id: ", watchlistId);
  var items;
  try {
    items = await findWatchlistUsers(watchlistId);
  } catch (error: any) {
    console.log("Error in watchlist/find-users route.");
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
  console.log("Success in watchlist/find-users", items);
  return Response.json({ message: items }, { status: 200 });
}
