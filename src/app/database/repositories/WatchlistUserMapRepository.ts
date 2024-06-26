import { db } from "@/app/database/database";
import {
  NewWatchlistUserMap,
  UpdateWatchlistUserMap,
  WatchlistUserMap,
} from "@/app/database/types";

export async function findWatchlistUserMapById(id: string) {
  return await db
    .selectFrom("watchlist_user_map")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findWatchlistUserMappings(
  criteria: Partial<WatchlistUserMap>
) {
  let query = db.selectFrom("watchlist_user_map");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.user_id) {
    query = query.where("user_id", "=", criteria.user_id);
  }

  if (criteria.watchlist_list_id) {
    query = query.where("watchlist_list_id", "=", criteria.watchlist_list_id);
  }

  return await query.selectAll().execute();
}

export async function updateWatchlistUserMap(
  id: string,
  updateWith: UpdateWatchlistUserMap
) {
  await db
    .updateTable("watchlist_user_map")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createWatchlistUserMap(userMap: NewWatchlistUserMap) {
  const { insertId } = await db
    .insertInto("watchlist_user_map")
    .values(userMap)
    .executeTakeFirstOrThrow();

  return await findWatchlistUserMappings({
    watchlist_list_id: userMap.watchlist_list_id,
    user_id: userMap.user_id,
  });
}

export async function deleteWatchlistUserMap(id: string) {
  const userMap = await findWatchlistUserMapById(id);

  if (userMap) {
    await db.deleteFrom("watchlist_user_map").where("id", "=", id).execute();
  }

  return userMap;
}
