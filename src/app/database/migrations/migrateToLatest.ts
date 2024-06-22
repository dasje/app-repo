import * as path from "path";
import { promises as fs } from "fs";
import { Kysely, Migrator, MysqlDialect, FileMigrationProvider } from "kysely";
import { createPool } from "mysql2";
import { Database } from "../types";
import { up } from "./migrate";

async function migrateToLatest() {
  const db = new Kysely<Database>({
    dialect: new MysqlDialect({
      pool: createPool({
        database: process.env.REACT_APP_DB_NAME,
        host: process.env.REACT_APP_DB_HOST,
        user: process.env.REACT_APP_DB_USER,
        password: process.env.REACT_APP_DB_PWD,
        port: process.env.REACT_APP_DB_PORT
          ? Number.parseInt(process.env.REACT_APP_DB_PORT)
          : 3306,
        connectionLimit: 10,
      }),
    }),
  });

  await up(db);

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "./migrationfiles"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
