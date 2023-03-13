require("dotenv").config();
const express = require("express");
const { sequelize_JIR3D, db_carrito } = require("../database/connectionDB");
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
      impresoras: "/impresoras",
      carrito: "/carrito",
      ordenes: "/ordenes"
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
      await sequelize_JIR3D.authenticate();
      // await db_carrito.authenticate()
      // await sequelize_JIR3D.sync({ force: true })
      // await db_carrito.sync({ force: true })
      // await sequelize_JIR3D.sync{ alter: true })
      // await db_carrito.sync({ alter: true })
      // await db_carrito.sync()
      // await sequelize_JIR3D.sync()
      console.log("DataBase Online")
    } catch (e) {
      console.log("reconnecting ...");
      setTimeout(() => {
        this.dbConnection()
      }, 5000);
      // throw new Error(e)
    }
  }
  routes() {
    // this.app.options('/auth', cors())
    this.app.use(this.paths.repository, require("../routes/respository_route"));
    this.app.use(this.paths.auth, require("../routes/auth_route"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios_route"));
    this.app.use(this.paths.roles, require("../routes/roles_route"));
    this.app.use(this.paths.impresoras, require("../routes/impresoras_route"));
    this.app.use(this.paths.carrito, require("../routes/carrito_route"));
    this.app.use(this.paths.ordenes, require("../routes/ordenes_route"));
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
