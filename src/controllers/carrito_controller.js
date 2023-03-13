const { response, request } = require("express");
const { Carrito } = require("../models/carrito");

const getCarrito = async (req = request, res = response) => {
    try {
        return res.json(req.carrito);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Contacta Administrador" })
    }

};
const postCarrito = async (req = request, res = response) => {
    const { uid, thingId } = req.params
    const carrito = req.carrito
    try {
        if (carrito?.estado === undefined) {
            const newCarrito = new Carrito({ ...req.body, uid, id: thingId })
            await newCarrito.save()
            console.log("creado");
            return res.json(newCarrito)
        } else {
            const update = await carrito.update({ estado: true })
            console.log("actualizado");
            return res.json(update)
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Contacta Administrador" })
    }
};
const putCarrito = async (req = request, res = response) => {
    const carrito = req.carrito
    try {
        await carrito.update(req.body)
        return res.json(carrito)
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Contacta Administrador" })
    }
};
const deleteCarrito = async (req, res = response) => {
    try {
        const carrito = req.carrito
        await carrito.update({ estado: false })
        // await carrito.destroy()
        res.json(carrito)
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Contacta Administrador" })
    }
};
module.exports = {
    getCarrito,
    postCarrito,
    putCarrito,
    deleteCarrito
};
