import { selectWatchlistItemSchema } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { updateWatchlistContent } from "@/app/database/repositories/WatchlistContentRepository";

export async function POST(req: Request) {
  let updatedItem;
  try {
    const { watchlistItemId, watchlistItemWatchStatus } =
      selectWatchlistItemSchema.parse(await req.json());
    updatedItem = await updateWatchlistContent(watchlistItemId, {
      watched: watchlistItemWatchStatus,
    });
  } catch (error: any) {
    console.log("Error in update-watchlist-item route.");
    Array.isArray(error) &&
      error.map((i, k) => console.log("Zod error: ", i.message));
    if (error.code === "ER_TOO_MANY_USER_CONNECTIONS") {
      console.log("Too many connections error.");
      return Response.json(
        {
          message: error.message,
        },
        {
          status: 503,
        }
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
  console.log("Success in update-watchlist-item route", updatedItem);
  return Response.json({ item: updatedItem }, { status: 201 });
}
