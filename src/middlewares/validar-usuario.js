const { response, request } = require("express")
const { Usuario } = require("../models/usuario")
const { Op } = require("sequelize");



const validarUsuario = async (req = request, res = response, next) => {
    const { uid } = req.params
    const { usuario } = req.body
    const existeUsuario = await Usuario.findOne({ where: { uid, estado: true } })
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
const validarUsuarioGet = (req = request, res = response, next) => {

}

module.exports = {
    validarUsuario,
    validarUsuarioGet
}