import { findUser } from "@/app/database/repositories/UserRepository";
import {
  createWatchlistUserMap,
  findWatchlistUser,
  findWatchlistUserMappings,
} from "@/app/database/repositories/WatchlistUserMapRepository";
import { addWatchlistFriendSchema } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";

type Params = {
  watchlist_id: string;
};

export async function POST(req: Request, context: { params: Params }) {
  const watchlistId = context.params.watchlist_id;
  console.log("Adding friend on watchlist with id: ", watchlistId);

  try {
    const { userEmail, friendEmail } = addWatchlistFriendSchema.parse(
      await req.json()
    );

    const user = await findUser({ email: userEmail });
    const friend = await findUser({ email: friendEmail });
    console.log("Found user and friend", user, friend);

    // Check permission
    const userIsOwner = await findWatchlistUserMappings({
      user_id: user.id,
      watchlist_id: watchlistId,
    });
    console.log("user is owner", userIsOwner);

    // Check friend not already added
    const friendIsAdded = await findWatchlistUser(watchlistId, friend.id);
    console.log("friend is added", friendIsAdded);

    if (userIsOwner[0].role !== "owner" || friendIsAdded) {
    } else {
      await createWatchlistUserMap({
        watchlist_id: watchlistId,
        user_id: friend.id,
        role: "friend",
      });
    }
  } catch (error: any) {
    console.log("Error in watchlist/add-friend route.");
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
  console.log("Success in watchlist/add-friend route");

  return Response.json({ status: 200 });
}
