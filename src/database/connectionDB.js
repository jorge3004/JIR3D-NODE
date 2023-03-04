require("dotenv").config();
const { Sequelize } = require('sequelize');


const handleConnect = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST_OR_SERVER,
  dialect: "mysql",
})


// https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection

module.exports = { handleConnect };
