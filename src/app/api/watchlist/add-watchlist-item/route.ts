import { findUser } from "@/app/database/repositories/UserRepository";
import { addWatchlistItemSchema } from "@/app/lib/schemas/watchlist-schemas/watchlist-schema";
import { createWatchlistList } from "@/app/database/repositories/WatchlistListsRepository";
import { createWatchlistContent } from "@/app/database/repositories/WatchlistContentRepository";

export async function POST(req: Request) {
  var addedItem;
  try {
    const {
      watchlistId,
      userEmail,
      mediaName,
      year,
      rated,
      released,
      runtime,
      genre,
      director,
      writer,
      plot,
      language,
      country,
      awards,
      poster,
      imdbId,
    } = addWatchlistItemSchema.parse(await req.json());

    const userId = (await findUser({ email: userEmail })).id;

    const itemToAdd = {
      watchlist_id: watchlistId,
      user_id: userId,
      watched: 0,
      date_added: new Date().toISOString(),
      media_name: mediaName,
      year,
      rated,
      released,
      runtime,
      genre,
      director,
      writer,
      plot,
      language,
      country,
      awards,
      poster,
      imdb_id: imdbId,
    };

    addedItem = await createWatchlistContent(itemToAdd);
  } catch (error: any) {
    console.log("Error in add-watchlist-item route.");
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
  console.log("Success in add-watchlist-item route", addedItem);
  return Response.json({ item: addedItem }, { status: 201 });
}
