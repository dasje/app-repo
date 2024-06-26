import { db } from "@/app/database/database";
import { App, NewApp, UpdateApp } from "@/app/database/types";

export async function findAppById(id: string) {
  return await db
    .selectFrom("apps")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findApps(criteria: Partial<App>) {
  let query = db.selectFrom("apps");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.app_name) {
    query = query.where("app_name", "=", criteria.app_name);
  }

  if (criteria.mobile) {
    query = query.where("mobile", "=", criteria.mobile);
  }

  if (criteria.offline) {
    query = query.where("offline", "=", criteria.offline);
  }

  if (criteria.version) {
    query = query.where("version", "=", criteria.version);
  }

  return await query.selectAll().execute();
}

export async function updateApp(id: string, updateWith: UpdateApp) {
  await db.updateTable("apps").set(updateWith).where("id", "=", id).execute();
}

export async function createApp(app: NewApp) {
  const { insertId } = await db
    .insertInto("apps")
    .values(app)
    .executeTakeFirstOrThrow();

  return await findApps({ app_name: app.app_name });
}

export async function deleteApp(id: string) {
  const app = await findAppById(id);

  if (app) {
    await db.deleteFrom("apps").where("id", "=", id).execute();
  }

  return app;
}
