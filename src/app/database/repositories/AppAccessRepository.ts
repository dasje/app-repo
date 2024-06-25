import { db } from "@/app/database/database";
import {
  UpdateUser,
  User,
  NewUser,
  AppAccess,
  UpdateAppAccess,
  NewAppAccess,
} from "@/app/database/types";

export async function findAppAccessById(id: number) {
  return await db
    .selectFrom("app_access")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findAppAccess(criteria: Partial<AppAccess>) {
  let query = db.selectFrom("app_access");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.app_id) {
    query = query.where("app_id", "=", criteria.app_id);
  }

  if (criteria.user_id) {
    query = query.where("user_id", "=", criteria.user_id);
  }

  return await query.selectAll().execute();
}

export async function updateAppAccess(id: number, updateWith: UpdateAppAccess) {
  await db
    .updateTable("app_access")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createAppAccess(user: NewAppAccess) {
  const { insertId } = await db
    .insertInto("app_access")
    .values(user)
    .executeTakeFirstOrThrow();

  return await findAppAccessById(Number(insertId!));
}

export async function deleteAppAccess(id: number) {
  const appAccess = await findAppAccessById(id);

  if (appAccess) {
    await db.deleteFrom("app_access").where("id", "=", id).execute();
  }

  return appAccess;
}
