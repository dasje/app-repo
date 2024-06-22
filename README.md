# Dev Setup

1. Copy .env.template and populate the variables.

- To identify the hostname you can use the following command in the SQL client `SHOW VARIABLES WHERE Variable_name = 'hostname'`
- To identify the port number you can use the folowing command in the SQL client `SHOW VARIABLES WHERE Variable_name = 'port'`

2. Run the following commands:

```npm install
npm run build
npm run dev
```
