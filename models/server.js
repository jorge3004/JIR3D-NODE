require("dotenv").config();
const express = require("express");
const { haddleConnect } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      repository: "/repository",
      auth: "/auth",
    };
    this.dbConection();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  dbConection() {
    const dbConnect = haddleConnect();
    const usuario = "jor"
    dbConnect.connect((err) => {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
      console.log("connected to mysql as id " + dbConnect.threadId);
    });
    const q = "CREATE TABLE IF NOT EXISTS users (usuario VARCHAR(10),clave VARCHAR(10),darkMode VARCHAR(10)) SELECT '" + usuario + "' AS usuario";
    dbConnect.query(q, (error, results) => {
      if (error) throw error;
      if (results.affectedRows) console.log("Se creo table usuarios");

    });
    dbConnect.end();
  }

  routes() {
    this.app.use(this.paths.repository, require("../routes/respository_route"));
    this.app.use(this.paths.auth, require("../routes/auth_route"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("app escuchando en puerto: " + this.port);
    });
  }
}
module.exports = Server;
