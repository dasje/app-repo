import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("User")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("hashedPassword", "text", (col) => col.notNull())
    .addColumn("image", "text")
    .execute();

  await db.schema
    .createTable("user_connections")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("user_id", "varchar(255)", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("friend_id", "varchar(255)", (col) => col.references("User.id"))
    .addColumn("friend_email", "text", (col) => col.notNull())
    .addColumn("invite_code", "varchar(255)")
    .addColumn("invite_date", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("connection_date", "text")
    .addColumn("connected", "boolean", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("Account")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("userId", "varchar(255)", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "bigint")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.schema
    .createTable("Session")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("userId", "varchar(255)", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable("VerificationToken")
    .ifNotExists()
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("Account_userId_index")
    .ifNotExists()
    .on("Account")
    .column("userId")
    .execute();

  await db.schema
    .createIndex("Session_userId_index")
    .ifNotExists()
    .on("Session")
    .column("userId")
    .execute();

  await db.schema
    .createTable("password_reset")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("user_email", "text", (col) => col.notNull())
    .addColumn("request_code", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable("apps")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("app_name", "text", (col) => col.notNull())
    .addColumn("app_prefix", "text", (col) => col.notNull())
    .addColumn("byline", "text", (col) => col.notNull())
    .addColumn("short_description", "text", (col) => col.notNull())
    .addColumn("long_description", "text", (col) => col.notNull())
    .addColumn("remote_image_address", "text", (col) => col.notNull())
    .addColumn("mobile", "boolean", (col) => col.notNull())
    .addColumn("offline", "boolean", (col) => col.notNull())
    .addColumn("version", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("app_access")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("user_id", "varchar(255)", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("app_id", "varchar(255)", (col) =>
      col.references("apps.id").onDelete("cascade").notNull()
    )
    .execute();

  await db.schema
    .createTable("watchlist_lists")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("created_by", "varchar(255)", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .execute();

  await db.schema
    .createTable("watchlist_user_map")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("watchlist_id", "varchar(255)", (col) =>
      col.references("watchlist_lists.id").onDelete("cascade").notNull()
    )
    .addColumn("user_id", "varchar(255)", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("role", "text", (col) => col.notNull())
    .addColumn("added_date", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable("watchlist_content")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (col) =>
      col.primaryKey().defaultTo(sql`UUID()`)
    )
    .addColumn("watchlist_id", "varchar(255)", (col) =>
      col.references("watchlist_lists.id").onDelete("cascade").notNull()
    )
    .addColumn("watched", "boolean", (col) => col.notNull())
    .addColumn("date_added", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("user_id", "varchar(255)", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("media_name", "text", (col) => col.notNull())
    .addColumn("year", "text")
    .addColumn("rated", "text")
    .addColumn("released", "text")
    .addColumn("runtime", "text")
    .addColumn("genre", "text")
    .addColumn("director", "text")
    .addColumn("writer", "text")
    .addColumn("plot", "text")
    .addColumn("language", "text")
    .addColumn("country", "text")
    .addColumn("awards", "text")
    .addColumn("poster", "text")
    .addColumn("imdb_id", "text")

    .execute();

  //   await db.schema
  //     .createIndex("pet_owner_id_index")
  //     .on("pet")
  //     .column("owner_id")
  //     .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("User").execute();
}
