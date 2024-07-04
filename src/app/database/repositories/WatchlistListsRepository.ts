import { db } from "@/app/database/database";
import {
  NewWatchlistLists,
  UpdateWatchlistLists,
  WatchlistLists,
} from "@/app/database/types";
import { findUser } from "./UserRepository";
import { createWatchlistUserMap } from "./WatchlistUserMapRepository";

export async function findWatchlistListById(id: string) {
  return await db
    .selectFrom("watchlist_lists")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findWatchlistList(criteria: Partial<WatchlistLists>) {
  let query = db.selectFrom("watchlist_lists");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.name) {
    query = query.where("name", "=", criteria.name);
  }

  if (criteria.created_by) {
    query = query.where("created_by", "=", criteria.created_by);
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  return await query.selectAll().execute();
}

export async function updateWatchlistList(
  id: string,
  updateWith: UpdateWatchlistLists
) {
  await db
    .updateTable("watchlist_lists")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createWatchlistList(watchlistList: NewWatchlistLists) {
  console.log("watchlist list new: ", watchlistList);
  const { insertId } = await db
    .insertInto("watchlist_lists")
    .values(watchlistList)
    .executeTakeFirstOrThrow();

  const addedList = await findWatchlistList({
    name: watchlistList.name,
    created_by: watchlistList.created_by,
  });
  await createWatchlistUserMap({
    watchlist_id: addedList[0].id,
    user_id: watchlistList.created_by,
  });
  return addedList[0];
}

export async function deleteWatchlistList(id: string) {
  const watchlistList = await findWatchlistListById(id);

  if (watchlistList) {
    await db.deleteFrom("watchlist_lists").where("id", "=", id).execute();
  }

  return watchlistList;
}
