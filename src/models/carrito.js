const { DataTypes } = require('sequelize');
const { sequelize_JIR3D } = require('../database/connectionDB');


const schema = {
    cid: {
        // field: 'GenreId',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    imagen: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    query: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    uid: {
        type: DataTypes.INTEGER,
    }
}



const Carrito = sequelize_JIR3D.define("carrito", schema)

// Impresora.prototype.toJSON = function () {
//     const { clave, refreshToken, ...usuario } = this.dataValues
//     return usuario
// }

module.exports = { Carrito };