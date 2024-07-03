import { NextResponse } from "next/server";
import { userEmailSchema } from "@/app/lib/schemas/available-apps-schema";
import { findAppAccess } from "@/app/database/repositories/AppAccessRepository";
import { findUser } from "@/app/database/repositories/UserRepository";
import { addWatchlistItemSchema } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { createWatchlistContent } from "@/app/database/repositories/WatchlistContentRepository";

export async function POST(req: Request) {
  var addedItem;
  try {
    const { watchlistId, mediaName } = addWatchlistItemSchema.parse(
      await req.json()
    );
    addedItem = await createWatchlistContent({
      watchlist_id: watchlistId,
      media_name: mediaName,
    });
  } catch (error: any) {
    console.log("Error in add-watchlist-item route.");
    if (error.code === "ER_TOO_MANY_USER_CONNECTIONS") {
      console.log("Too many connections error.");
      return Response.json({
        message: error.message,
        status: 503,
      });
    }
    return Response.json({
      message: error.message,
      status: 500,
    });
  }
  console.log("Success in add-watchlist-item route", addedItem);
  return Response.json({ apps: addedItem });
}
