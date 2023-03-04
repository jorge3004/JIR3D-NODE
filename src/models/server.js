require("dotenv").config();
const express = require("express");
const { handleConnect } = require("../database/connectionDB");
const cors = require("cors");
const { socketController } = require("../sockets/controller_sockets");

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.NODE_TARGET_PORT;
    this.paths = {
      repository: "/repository",
      usuarios: "/usuarios",
      auth: "/auth",
      roles: "/roles",
      impresoras: "/impresoras"
    };
    this.dbConnection();
    this.middlewares();
    this.routes();


    // this.server = require('http').createServer(this.app);
    // this.io = require('socket.io')(this.server);
    // this.sockets()
  }
  middlewares() {
    this.app.use(cors(corsOptions))
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  async dbConnection() {
    try {
      await handleConnect.authenticate();
      // await handleConnect.sync({ force: true })
      await handleConnect.sync({ alter: true })
      // await handleConnect.sync()
      console.log("DataBase Online")
    } catch (e) {
      throw new Error(e)
    }
  }
  routes() {
    // this.app.options('/auth', cors())
    this.app.use(this.paths.repository, require("../routes/respository_route"));
    this.app.use(this.paths.auth, require("../routes/auth_route"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios_route"));
    this.app.use(this.paths.roles, require("../routes/roles_route"));
    this.app.use(this.paths.impresoras, require("../routes/impresoras_route"));
  }
  sockets() {
    this.io.on('connection', socketController);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("app escuchando en puerto: " + this.port);
    });
  }
  // listen() {
  //   this.server.listen(this.port, (err) => {
  //     if (err) throw new Error(err);
  //     console.log("socket io escuchando en puerto: " + this.port);
  //   });
  // }
}
module.exports = { Server };
