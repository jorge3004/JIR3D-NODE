const { DataTypes } = require('sequelize');
const { handleConnect } = require('../database/connectionDB');


const schema = {
    role: {
        type: DataTypes.STRING,
        required: true
    },
}
const Role = handleConnect.define("role", schema)

module.exports = { Role };
