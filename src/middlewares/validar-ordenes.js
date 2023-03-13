const { request, response } = require("express");
const { Op } = require("sequelize");
const { Carrito } = require("../models/carrito");
const { Usuario } = require("../models/usuario");

const validarOrdenesGet = async (req = request, res = response, next) => {
    const { admin } = req.query
    const { uid } = req.params
    const adminCheck = (admin === 'true')
    console.log(adminCheck, admin);
    try {
        const usuario = await Usuario.findOne({ where: { uid } })
        if (!usuario)
            return res.status(400).json({ msg: `usuario con UID:${uid} no existe` })
        let ordenes = {}
        if (adminCheck)
            ordenes = await Carrito.findAll({ where: { estado: true } })
        else {
            const usuarios = await Usuario.findAll({
                where: { estado: true, [Op.or]: [{ createdBy: uid }, { uid }] }, attributes: ['uid']
            })
            const usuariosArray = usuarios.map(item => item.dataValues)
            ordenes = await Carrito.findAll({ where: { estado: true, [Op.or]: usuariosArray } })
        }
        req.ordenes = ordenes
    } catch (e) {
        console.log("Error showAllSchemas", e);
        return res.json({ msg: "Error showAllSchemas" })
    }

    // db_carrito.query('show tables').then(oro => {
    //     console.log(oro);
    // });
    next()
}
module.exports = { validarOrdenesGet }