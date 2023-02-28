const { response } = require("express")

const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar role sin validar token"
        })
    }
    const { role, usuario } = req.usuario

    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `usuario: ${usuario}, no tiene permiso de administrador`
        })
    }
    next()
}
const tieneRole = (...roles) => {
    return (req, res = request, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar role sin validar token"
            })
        }
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de los roles: ${roles}`
            })
        }
        next()

    }
}
module.exports = { esAdminRole, tieneRole }