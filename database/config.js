require("dotenv").config();
var mysql = require("mysql2");

const db_config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

function haddleConnect() {
  return mysql.createConnection(db_config); // Recreate the connection, since
}


// https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection

module.exports = {  haddleConnect };
