const { response, request } = require("express")
const { Op } = require("sequelize");
const { Impresora } = require("../models/impresora");



const validarImpresoraDelete = async (req = request, res = response, next) => {
    const { id } = req.params
    const impresora = req.body.impresora
    const existeImpresora = await Impresora.findOne({ where: { id, estado: true } })
    if (!existeImpresora) {
        return res.status(401).json({
            msg: `La impresora con id: ${id} no existe`
        })
    }
    let impresoraDuplicado = false;
    if (!!impresora)
        impresoraDuplicado = await Impresora.findOne({ where: { id: { [Op.ne]: id }, impresora } })
    if (impresoraDuplicado) {
        return res.status(401).json({
            msg: `El impresora: ${impresora} ya existe`
        })
    }
    req.impresora = existeImpresora
    next()
}
const validarImpresoraPost = async (req = request, res = response, next) => {
    let impresoraReq = req.body

    if (!impresoraReq.nombre)
        return res.status(401).json({
            msg: `La parametro nombre no definido`
        })

    const printerFound = await Impresora.findOne({ where: { nombre: impresoraReq.nombre } })

    if (printerFound) {
        if (printerFound.estado) {
            return res.status(401).json({
                msg: `La impresora: ${impresoraReq.nombre} ya existe`
            })
        } else {
            req.found = true
            req.impresora = printerFound
        }
    } else
        req.found = false
    next()
}
const validarImpresoraUpdate = async (req = request, res = response, next) => {
    const { id } = req.params
    let impresoraReq = req.body

    if (!impresoraReq.nombre)
        return res.status(401).json({
            msg: `La parametro nombre no definido en put request`
        })
    const printerFound = await Impresora.findOne({ where: { id, estado: true } })
    if (!printerFound)
        return res.status(401).json({
            msg: `La impresora: ${impresoraReq.nombre} no existe`
        })

    const printerDuplicate = await Impresora.findOne({ where: { id: { [Op.ne]: id }, nombre: impresoraReq.nombre } })

    if (printerDuplicate)
        return res.status(401).json({
            msg: `La impresora: ${impresoraReq.nombre} ya existe`
        })


    req.impresora = printerFound

    next()
}

module.exports = {
    validarImpresoraDelete, validarImpresoraPost, validarImpresoraUpdate
}