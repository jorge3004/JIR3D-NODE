const { response, request } = require("express")
const { Usuario } = require("../models/usuario")
const { Op } = require("sequelize");



const validarUsuario = async (req = request, res = response, next) => {
    const { uid } = req.params
    const usuario = req.body.usuario
    console.log(uid);
    const existeUsuario = await Usuario.findOne({ where: { uid, estado: true } })
    // const existeUsuario = await Usuario.findOne({ where: { uid, estado: true } })
    if (!existeUsuario) {
        return res.status(401).json({
            msg: `El usuario: ${usuario} no existe`
        })
    }
    let usuarioDuplicado = false;
    if (!!usuario)
        usuarioDuplicado = await Usuario.findOne({ where: { uid: { [Op.ne]: uid }, usuario } })
    // const usuarioDuplicado = await Usuario.findOne({ where: { uid: { [Op.ne]: uid }, usuario, estado: true } })
    if (usuarioDuplicado) {
        return res.status(401).json({
            msg: `El usuario: ${usuario} ya existe`
        })
    }
    req.usuario = existeUsuario
    next()
}

module.exports = {
    validarUsuario
}