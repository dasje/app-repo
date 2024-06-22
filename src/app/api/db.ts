import { createConnection } from "mariadb";

async function asyncFunction() {
  console.log(process.env);
  const conn = await createConnection({
    host: process.env.REACT_APP_DB_HOST, //"h30.mijn.host",
    user: process.env.REACT_APP_DB_USER, //"bq111967_bensweeneynl",
    password: process.env.REACT_APP_DB_PWD, //"uHa8KM7aDMyeMvPrWSs5",
    port: 3306,
  });

  try {
    const a = await conn.query(`use ${process.env.REACT_APP_DB_USER}`);
    const res = await conn.query("select * from persons");
    console.log(res); // [{ "1": 1 }]
    return res;
  } finally {
    conn.end();
  }
}

asyncFunction();
