import { createConnection } from "mariadb";

async function asyncFunction() {
    const conn = await createConnection({
        host: "h30.mijn.host",
        user: "bq111967_bensweeneynl",
        password: "uHa8KM7aDMyeMvPrWSs5",
        port: 3306,
      });
   
    try {
      const a = await conn.query('use bq111967_bensweeneynl');
     const res = await conn.query('select * from persons');
     console.log(res); // [{ "1": 1 }]
     return res;
    } finally {
     conn.end();
    }
   }

 asyncFunction()