import { db } from "@/app/database/database";
import {
  NewWatchlistContent,
  UpdateWatchlistContent,
  WatchlistContent,
} from "@/app/database/types";

export async function findWatchlistContentById(id: string) {
  return await db
    .selectFrom("watchlist_content")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findWatchlistContent(
  criteria: Partial<WatchlistContent>
) {
  let query = db.selectFrom("watchlist_content");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.media_name) {
    query = query.where("media_name", "=", criteria.media_name);
  }

  if (criteria.watched) {
    query = query.where("watched", "=", criteria.watched);
  }

  if (criteria.watchlist_id) {
    query = query.where("watchlist_id", "=", criteria.watchlist_id);
  }

  return await query.selectAll().execute();
}

export async function updateWatchlistContent(
  id: string,
  updateWith: UpdateWatchlistContent
) {
  await db
    .updateTable("watchlist_content")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createWatchlistContent(
  watchlistContent: NewWatchlistContent
) {
  const { insertId } = await db
    .insertInto("watchlist_content")
    .values(watchlistContent)
    .executeTakeFirstOrThrow();

  return await findWatchlistContent({
    watchlist_id: watchlistContent.watchlist_id,
    media_name: watchlistContent.media_name,
  });
}

export async function deleteWatchlistContentItem(id: string) {
  const watchlistContent = await findWatchlistContentById(id);

  if (watchlistContent) {
    await db.deleteFrom("watchlist_content").where("id", "=", id).execute();
  }

  return watchlistContent;
}
