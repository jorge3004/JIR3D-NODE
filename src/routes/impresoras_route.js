const { Router } = require("express");
// const { check } = require("express-validator");
const {
  validarImpresoraDelete,
  validarImpresoraPost,
  validarImpresoraUpdate
} = require("../middlewares")
const {
  getImpresoras,
  getImpresora,
  postImpresora,
  putImpresora,
  deleteImpresora
} = require("../controllers/impresoras_controller");

const router = Router();
router.get("/", getImpresoras);
router.get("/:id", getImpresora);
router.post("/", [
  validarImpresoraPost,
], postImpresora);
router.put("/:id", [
  validarImpresoraUpdate
], putImpresora);
router.delete("/:id", [
  validarImpresoraDelete,
], deleteImpresora);

module.exports = router;
