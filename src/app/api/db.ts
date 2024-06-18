import { createConnection } from "mariadb";

async function asyncFunction() {
    const conn = await createConnection({
        host: "h30.mijn.host",
        user: "bq111967_bensweeneynl",
        password: "uHa8KM7aDMyeMvPrWSs5",
        port: 3306,
      });
   
    try {
     const res = await conn.query('select 1', [2]);
     console.log(res); // [{ "1": 1 }]
     return res;
    } finally {
     conn.end();
    }
   }

 asyncFunction()