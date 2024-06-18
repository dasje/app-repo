# ENV.LOCAL example

REACT_APP_DB_PORT: 3306
REACT_APP_DB_HOST: h30.mijn.host
REACT_APP_DB_USER: 'myUser',
REACT_APP_DB_PWD: 'myPwd'


The SQL query SHOW VARIABLES WHERE Variable_name = 'hostname' will show you the hostname of the MySQL server which you can easily resolve to its IP address.

SHOW VARIABLES WHERE Variable_name = 'port' Will give you the port number.

You can find details about this in MySQL's manual: 12.4.5.41. SHOW VARIABLES Syntax and 5.1.4. Server System Variables