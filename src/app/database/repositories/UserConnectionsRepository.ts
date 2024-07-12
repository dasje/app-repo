import { db } from "@/app/database/database";
import {
  UpdateUserConnection,
  UserConnection,
  NewUserConnection,
} from "@/app/database/types";

export async function findUserConnectionById(id: string) {
  return await db
    .selectFrom("user_connections")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findUserConnections(criteria: Partial<UserConnection>) {
  let query = db.selectFrom("user_connections");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.user_id) {
    query = query.where("user_id", "=", criteria.user_id);
  }

  if (criteria.friend_id) {
    query = query.where("friend_id", "=", criteria.friend_id);
  }

  if (criteria.invite_code) {
    query = query.where("invite_code", "=", criteria.invite_code);
  }

  return await query.selectAll().execute();
}

export async function findUserFriendDetails(userId: string) {
  return await db
    .selectFrom("user_connections")
    .where("user_connections.user_id", "=", userId)
    .where("user_connections.connected", "=", 1)
    .innerJoin("User", "User.id", "user_connections.friend_id")
    .selectAll()
    .execute();
}

export async function updateUserConnection(
  id: string,
  updateWith: UpdateUserConnection
) {
  await db
    .updateTable("user_connections")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createUserConnection(userConnection: NewUserConnection) {
  const { insertId } = await db
    .insertInto("user_connections")
    .values(userConnection)
    .executeTakeFirstOrThrow();
  console.log("HEY", insertId);
  return await findUserConnections({
    user_id: userConnection.user_id,
    invite_code: userConnection.invite_code,
  });
}

export async function deleteUserConnection(id: string) {
  const userConnection = await findUserConnectionById(id);

  if (userConnection) {
    await db.deleteFrom("user_connections").where("id", "=", id).execute();
  }

  return userConnection;
}
