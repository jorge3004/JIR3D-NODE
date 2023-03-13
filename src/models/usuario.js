const { DataTypes } = require('sequelize');
const { sequelize_JIR3D } = require('../database/connectionDB');


const schema = {
    uid: {
        // field: 'GenreId',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuario: {
        type: DataTypes.STRING,
        // required: [true, "El nombre es obligatorio"]
    },
    nombre: {
        type: DataTypes.STRING,
        // required: [true, "El nombre es obligatorio"]
    },
    categoria: {
        type: DataTypes.STRING,
    },
    lastPath: {
        type: DataTypes.STRING,
    },
    page: {
        type: DataTypes.INTEGER,
    },
    clave: {
        type: DataTypes.STRING,
        // required: [true, "La clave es obligatorio"]
    },
    tipo: {
        type: DataTypes.STRING,
        defaultValue: ""
        // required: true,
        // emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
        // required: true,
        // emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    correo: {
        type: DataTypes.STRING,
        // required: true,
        // emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    impresora: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.STRING,
        // required: true,
        // emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    darkMode: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    // createdAt: {
    //     type: DataTypes.DATE,
    //     // allowNull: false,
    //     defaultValue: DataTypes.NOW
    // },
    // updatedAt: {
    //     type: DataTypes.DATE,
    //     // allowNull: false,
    //     defaultValue: DataTypes.NOW
    // },
    google: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    img: {
        type: DataTypes.STRING,
        // default: false,
    },
    createdBy: {
        type: DataTypes.STRING,
        // default: false,
    },
}


const Usuario = sequelize_JIR3D.define("usuario", schema)


Usuario.prototype.toJSON = function () {
    const { clave, refreshToken, ...usuario } = this.dataValues
    // usuario.uid = usuario.id;
    return usuario
}
// Usuario.prototype.toJSONClave = function () {
//     const { refreshToken, ...usuario } = this.dataValues
//     // usuario.uid = usuario.id;
//     return usuario
// }

// schema.toJson = function () {
//     const { clave, ...usuario } = this.toObject()
//     return usuario
// }

module.exports = { Usuario };
