import { db } from "@/app/database/database";
import { NewPasswordReset, PasswordReset } from "../types";

export async function findPasswordResetRequestById(id: string) {
  return await db
    .selectFrom("password_reset")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findPasswordReset(criteria: Partial<PasswordReset>) {
  let query = db.selectFrom("password_reset");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.user_email) {
    query = query.where("user_email", "=", criteria.user_email);
  }

  if (criteria.request_code) {
    query = query.where("request_code", "=", criteria.request_code);
  }
  return await query.selectAll().executeTakeFirst();
}

export async function findValidPasswordReset(requestCode: string) {
  let now = Date.now();
  let res = await db
    .selectFrom("password_reset")
    .selectAll()
    .where("request_code", "=", requestCode)
    .execute();

  let originalDate = new Date(res[0].created_at.valueOf());

  if ((now.valueOf() - res[0].created_at.valueOf()) / 3600000 < 3) {
    return res;
  } else {
    return undefined;
  }
}

export async function createPasswordReset(request: NewPasswordReset) {
  await db
    .insertInto("password_reset")
    .values(request)
    .executeTakeFirstOrThrow();
}

export async function deletePasswordReset(id: string) {
  const passwordReset = await findPasswordResetRequestById(id);

  if (passwordReset) {
    await db.deleteFrom("password_reset").where("id", "=", id).execute();
  }

  return passwordReset;
}
