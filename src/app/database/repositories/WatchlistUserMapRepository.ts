import { db } from "@/app/database/database";
import {
  NewWatchlistUserMap,
  UpdateWatchlistUserMap,
  WatchlistUserMap,
} from "@/app/database/types";
import { findUser } from "./UserRepository";

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

  if (criteria.watchlist_id) {
    query = query.where("watchlist_id", "=", criteria.watchlist_id);
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
    watchlist_id: userMap.watchlist_id,
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

export async function fetchAllUserListWithContent(
  userId: string,
  watchlistId: string
) {
  return await db
    .selectFrom("watchlist_user_map")
    .where("user_id", "=", userId)
    .where("watchlist_id", "=", watchlistId)
    .selectAll()
    .execute();
}

export async function fetchAllUserLists(userId: string) {
  return await db
    .selectFrom("watchlist_user_map")
    .where("user_id", "=", userId)
    .innerJoin(
      "watchlist_lists",
      "watchlist_lists.id",
      "watchlist_user_map.watchlist_id"
    )
    .selectAll()
    .execute();
}
