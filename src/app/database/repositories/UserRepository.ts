import { db } from "@/app/database/database";
import { UpdateUser, User, NewUser } from "@/app/database/types";

export async function findUserById(id: number) {
  return await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findUser(criteria: Partial<User>) {
  let query = db.selectFrom("users");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.email) {
    query = query.where("email", "=", criteria.email);
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  if (criteria.login_at) {
    query = query.where("login_at", "=", criteria.login_at);
  }

  return await query.selectAll().execute();
}

export async function updateUser(id: number, updateWith: UpdateUser) {
  await db.updateTable("users").set(updateWith).where("id", "=", id).execute();
}

export async function createUser(user: NewUser) {
  const { insertId } = await db
    .insertInto("users")
    .values(user)
    .executeTakeFirstOrThrow();

  return await findUserById(Number(insertId!));
}

export async function deleteUser(id: number) {
  const user = await findUserById(id);

  if (user) {
    await db.deleteFrom("users").where("id", "=", id).execute();
  }

  return user;
}
