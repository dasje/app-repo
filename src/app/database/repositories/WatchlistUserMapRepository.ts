import { db } from "@/app/database/database";
import {
  NewWatchlistUserMap,
  UpdateWatchlistUserMap,
  WatchlistUserMap,
} from "@/app/database/types";

export async function findWatchlistUserMapById(id: number) {
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
  id: number,
  updateWith: UpdateWatchlistUserMap
) {
  await db
    .updateTable("watchlist_user_map")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createWatchlistUserMap(user: NewWatchlistUserMap) {
  const { insertId } = await db
    .insertInto("watchlist_user_map")
    .values(user)
    .executeTakeFirstOrThrow();

  return await findWatchlistUserMapById(Number(insertId!));
}

export async function deleteWatchlistUserMap(id: number) {
  const userMap = await findWatchlistUserMapById(id);

  if (userMap) {
    await db.deleteFrom("watchlist_user_map").where("id", "=", id).execute();
  }

  return userMap;
}
