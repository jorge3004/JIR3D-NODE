const { DataTypes } = require('sequelize');
const { sequelize_JIR3D } = require('../database/connectionDB');


const schema = {
    id: {
        // field: 'GenreId',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}

const Impresora = sequelize_JIR3D.define("impresora", schema)

// Impresora.prototype.toJSON = function () {
//     const { clave, refreshToken, ...usuario } = this.dataValues
//     return usuario
// }

module.exports = { Impresora };
