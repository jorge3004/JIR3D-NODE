const { Router } = require("express");
// const { check } = require("express-validator");
const {
  getCarrito,
  postCarrito,
  putCarrito,
  deleteCarrito
} = require("../controllers/carrito_controller");

const {
  validarCarritoPut,
  validarCarritoGet,
  validarCarritoPost,
  validarCarritoDelete
} = require("../middlewares")

const router = Router();
router.get("/:uid",
  validarCarritoGet,
  getCarrito);
router.post("/:uid/:thingId", [
  validarCarritoPost,
], postCarrito);
router.put("/:uid/:thingId", [
  validarCarritoPut
], putCarrito);
router.delete("/:uid/:thingId", [
  validarCarritoDelete,
], deleteCarrito);

module.exports = router;
