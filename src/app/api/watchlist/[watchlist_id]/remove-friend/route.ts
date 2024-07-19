import { findUser } from "@/app/database/repositories/UserRepository";
import {
  deleteWatchlistUserMap,
  findWatchlistUser,
  findWatchlistUserMappings,
} from "@/app/database/repositories/WatchlistUserMapRepository";
import { addWatchlistFriendSchema } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";

type Params = {
  watchlist_id: string;
};

export async function POST(req: Request, context: { params: Params }) {
  const watchlistId = context.params.watchlist_id;
  console.log("Removing friend from watchlist with id: ", watchlistId);

  try {
    const { userEmail, friendEmail } = addWatchlistFriendSchema.parse(
      await req.json()
    );

    const user = await findUser({ email: userEmail });
    const friend = await findUser({ email: friendEmail });

    // Check permission
    const userIsOwner = await findWatchlistUser(watchlistId, user.id);

    const userIsFriend = await findWatchlistUser(watchlistId, friend.id);

    if (userIsOwner.role !== "owner") {
    } else {
      await deleteWatchlistUserMap(userIsFriend.id);
    }
  } catch (error: any) {
    console.log("Error in watchlist/remove-friend route.");
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
  console.log("Success in watchlist/remove-friend route");

  return Response.json({ status: 200 });
}
