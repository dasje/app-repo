import { createPool } from "mysql2"; // do not use 'mysql2/promises'!
import { MysqlDialect } from "kysely";
import { KyselyAuth } from "@auth/kysely-adapter";
import { DB } from "@/app/database/types";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const dialect = new MysqlDialect({
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
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new KyselyAuth<DB>({
  dialect,
});
