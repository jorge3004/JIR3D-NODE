require("dotenv").config();
const { Sequelize } = require('sequelize');


var reconnectOptions = {
  max_retries: 999,
  // max_retries: 999,
  onRetry: function (count) {
    console.log("connection lost, trying to reconnect (" + count + ")");
  }
};

const sequelize_JIR3D = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST_OR_SERVER,
  dialect: "mysql",
  reconnect: reconnectOptions || true
})

const db_carrito = new Sequelize(process.env.MYSQL_DATABASE_CARRITO, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST_OR_SERVER,
  dialect: "mysql",
})


// https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection

module.exports = { sequelize_JIR3D, db_carrito };
