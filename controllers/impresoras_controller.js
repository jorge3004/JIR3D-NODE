const { response, request } = require("express");
const bcryptjs = require('bcryptjs')
const { Impresora } = require("../models/impresora");

const getImpresoras = async (req = request, res = response) => {
    // const { per_page = null } = req.query
    // let arg = per_page === null ? {} : (per_page !== "" && Number.isInteger(Number(per_page))) ? { limit: Number(per_page) } : false
    // if (arg) {
    //     const { limit = null } = arg
    //     let fJson = {}
    //     arg.where = { estado: true }
    //     if (limit === null) {
    //         const { count, rows } = await Impresora.findAndCountAll(arg)
    //         fJson = { total: count, impresoras: rows }
    //     } else {
    // const impresoras = await Impresora.findAll(arg)
    const impresoras = await Impresora.findAll({ where: { estado: true } })
    //         fJson = { total: Object.keys(impresoras).length, impresoras }
    //     }
    res.json(impresoras);
    // } else {
    //     return res.status(404).json({
    //         msg: "param per_page debe ser numero"
    //     })
    // }
};
const getImpresora = async (req = request, res = response) => {
    const { id } = req.params
    const impresora = await Impresora.findByPk(id)
    if (impresora) {
        res.json(impresora);
    } else {
        res.status(404).json({ msg: `No existe un impresora con el id ${id}` })
    }
};
const postImpresora = async (req = request, res = response) => {
    try {
        if (req.found) {
            const resp = await req.impresora.update({ ...req.impresora, estado: true })
            return res.json(resp)
        } else {
            const printer = new Impresora(req.body)
            await printer.save()
            return res.json(printer)
        }
    } catch (e) {
        res.status(500).json({ msg: "Contacta Administrador" })
    }
};
const putImpresora = async (req = request, res = response) => {
    let inputValues = req.body
    const impresora = req.impresora
    try {
        // if (inputValues.clave) {
        //     const salt = bcryptjs.genSaltSync()
        //     inputValues.clave = bcryptjs.hashSync(inputValues.clave, salt)
        // }
        await impresora.update(inputValues)
        res.json({ ...impresora.dataValues, ...inputValues })
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Contacta Administrador" })
    }
};
const deleteImpresora = async (req, res = response) => {
    const impresora = req.impresora
    try {
        // await impresora.destroy()
        await impresora.update({ estado: false })
        res.json({ impresora })
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Contacta Administrador" })
    }
};
module.exports = {
    getImpresoras,
    getImpresora,
    postImpresora,
    putImpresora,
    deleteImpresora
};
