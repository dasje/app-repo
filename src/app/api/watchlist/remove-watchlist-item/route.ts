import { selectWatchlistItemSchema } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { deleteWatchlistContentItem } from "@/app/database/repositories/WatchlistContentRepository";

export async function POST(req: Request) {
  console.log("HERE REQ ", req);
  try {
    const { watchlistItemId } = selectWatchlistItemSchema.parse(
      await req.json()
    );
    await deleteWatchlistContentItem(watchlistItemId);
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
  console.log("Success in remove-watchlist-item route");
  return Response.json({ message: "success" }, { status: 200 });
}
