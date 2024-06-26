import { db } from "@/app/database/database";
import { AppAccess, UpdateAppAccess, NewAppAccess } from "@/app/database/types";

export async function findAppAccessById(id: string) {
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

export async function updateAppAccess(id: string, updateWith: UpdateAppAccess) {
  await db
    .updateTable("app_access")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createAppAccess(app: NewAppAccess) {
  const { insertId } = await db
    .insertInto("app_access")
    .values(app)
    .executeTakeFirstOrThrow();

  return await findAppAccess({ app_id: app.app_id });
}

export async function deleteAppAccess(id: string) {
  const appAccess = await findAppAccessById(id);

  if (appAccess) {
    await db.deleteFrom("app_access").where("id", "=", id).execute();
  }

  return appAccess;
}
