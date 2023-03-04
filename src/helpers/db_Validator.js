const { Role } = require("../models/role")
const { Usuario } = require("../models/usuario")

const esRoleValido = async (role = "") => {
    const existeRole = await Role.findOne({ where: { role } })
    if ((!existeRole)) {
        throw new Error(`El rol ${role} no está registrado en la DB`)
    }

}
const emailExiste = async (correo = "") => {
    const existeEmail = await Usuario.findOne({
        where: {
            correo: correo
        }
    })
    if (existeEmail) {
        throw new Error("Ya existe un usuario con correo: " + correo)
    }
}
const usuarioExiste = async (usuario = "") => {
    const existeUsuario = await Usuario.findOne({
        where: {
            usuario
        }
    })
    if (existeUsuario) {
        throw new Error("Ya existe usuario: " + usuario)
    }
}
const existeUsuarioPorId = async (uid = "") => {
    const existeUsuario = await Usuario.findOne({ where: { uid, estado: true } })
    if (!existeUsuario) {
        throw new Error("El ID: " + uid) + " no existe"
    }
}


module.exports = { esRoleValido, emailExiste, existeUsuarioPorId, usuarioExiste }