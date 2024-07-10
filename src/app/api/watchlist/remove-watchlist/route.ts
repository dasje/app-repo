import { findUser } from "@/app/database/repositories/UserRepository";
import {
  deleteWatchlistSchema,
  selectWatchlistItemSchema,
} from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { deleteWatchlistContentItem } from "@/app/database/repositories/WatchlistContentRepository";
import {
  deleteWatchlistList,
  deleteWatchlistMessage,
} from "@/app/database/repositories/WatchlistListsRepository";

export async function POST(req: Request) {
  console.log("HERE REQ ", req);
  let deleteRes: deleteWatchlistMessage;
  try {
    const { watchlistId, userEmail } = deleteWatchlistSchema.parse(
      await req.json()
    );
    const userId = (await findUser({ email: userEmail })).id;
    deleteRes = await deleteWatchlistList(userId, watchlistId);
  } catch (error: any) {
    console.log("Error in remove-watchlist-item route.");
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
  if (deleteRes.message === "user_does_not_have_permission") {
    return Response.json({ message: "error" }, { status: 403 });
  }
  console.log("Success in remove-watchlist-item route");
  return Response.json({ message: "success" }, { status: 200 });
}
