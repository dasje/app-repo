import { db } from "@/app/database/database";
import { UpdateUser, User, NewUser } from "@/app/database/types";

export async function findUserById(id: string) {
  return await db
    .selectFrom("User")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findUser(criteria: Partial<User>) {
  let query = db.selectFrom("User");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.email) {
    query = query.where("email", "=", criteria.email);
  }
  return await query.selectAll().executeTakeFirst();
}

export async function updateUser(id: string, updateWith: UpdateUser) {
  const result = await db
    .updateTable("User")
    .set(updateWith)
    .where("id", "=", id)
    .executeTakeFirst();
}

export async function createUser(user: NewUser) {
  const { insertId } = await db
    .insertInto("User")
    .values(user)
    .executeTakeFirstOrThrow();
  console.log("HEY", insertId);
  return await findUser({ email: user.email! });
}

export async function deleteUser(id: string) {
  const user = await findUserById(id);

  if (user) {
    await db.deleteFrom("User").where("id", "=", id).execute();
  }

  return user;
}
