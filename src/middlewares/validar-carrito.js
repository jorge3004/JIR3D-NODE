const e = require("express");
const { Carrito } = require("../models/carrito");
const { Usuario } = require("../models/usuario");

const validarCarritoGet = async (req, res, next) => {
    try {
        const { uid } = req.params
        const usuario = await Usuario.findOne({ where: { uid, estado: true } })
        if (!usuario) {
            return res.status(400).json({ msg: `Usuario con UID: ${uid} no encontrado` })
        }
        const carrito = await Carrito.findAll({ where: { uid, estado: true } })
        req.carrito = carrito
    } catch (e) {
        console.log(e);
        return res.status(400).json({ errors: "Contacta Administrador" })
    }
    next()
}
const validarCarritoPost = async (req = request, res = response, next) => {
    try {
        const { uid, thingId } = req.params
        const usuario = await Usuario.findOne({ where: { uid, estado: true } })
        if (!usuario) {
            return res.status(400).json({ msg: `Usuario con UID: ${uid} no encontrado` })
        }
        const carrito = await Carrito.findOne({ where: { uid, id: thingId } })
        if (carrito && carrito?.estado)
            return res.status(400).json({ msg: "Thing ya existe" })
        req.carrito = carrito

    } catch (e) {
        console.log(e);
        return res.status(400).json({ errors: "Contacta Administrador, validación" })
    }
    next()
}
const validarCarritoDelete = async (req = request, res = response, next) => {
    try {
        const { thingId, uid } = req.params
        const usuario = await Usuario.findOne({ where: { uid, estado: true } })
        if (!usuario)
            return res.status(400).json({ msg: `Usuario con UID: ${uid} no encontrado` })
        const carrito = await Carrito.findOne({ where: { id: thingId, uid } })
        if (!carrito)
            return res.status(400).json({ msg: "ThingID no encontrado" })

        req.carrito = carrito
    } catch (e) {
        console.log(e);
        return res.status(400).json({ errors: "Contacta Administrador" })
    }

    next()
}
const validarCarritoPut = async (req = request, res = response, next) => {
    try {
        const { uid, thingId } = req.params
        const usuario = await Usuario.findOne({ where: { uid, estado: true } })
        if (!usuario) {
            return res.status(400).json({ msg: `Usuario con UID: ${uid} no encontrado` })
        }
        const carrito = await Carrito.findOne({ where: { id: thingId, uid } })
        if (!carrito)
            return res.status(400).json({ msg: `Thing Item con ID: ${thingId} y UID:${thingId}  no existe` })

        req.carrito = carrito
    } catch (e) {

        return res.status(400).json({ errors: "Contacta Administrador" })
    }
    next()
}

module.exports = {
    validarCarritoGet,
    validarCarritoPost,
    validarCarritoDelete,
    validarCarritoPut
}