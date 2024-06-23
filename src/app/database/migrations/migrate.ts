import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("password", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("login_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("ip", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("apps")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("app_name", "text", (col) => col.notNull())
    .addColumn("mobile", "boolean", (col) => col.notNull())
    .addColumn("offline", "boolean", (col) => col.notNull())
    .addColumn("version", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("app_access")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addColumn("app_id", "integer", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("watchlist_lists")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("created_by", "integer", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("watchlist_content")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("watchlist_id", "integer", (col) => col.notNull())
    .addColumn("media_name", "text", (col) => col.notNull())
    .addColumn("watched", "boolean", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("watchlist_user_map")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("watchlist_id", "integer", (col) => col.notNull())
    .addColumn("user_id", "integer", (col) => col.notNull())
    .execute();

  //   await db.schema
  //     .createIndex("pet_owner_id_index")
  //     .on("pet")
  //     .column("owner_id")
  //     .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
}
