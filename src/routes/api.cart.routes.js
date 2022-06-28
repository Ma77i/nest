const express = require("express");

// Import Router
const { Router } = express;
const router = Router();

// controllers
const controller = require("../controllers/cart.controller");

router.get("", controller.getAll); // OBTENGO TODOS LOS CARRITOS
router.get("/:id/products", controller.getCartById); // OBTENGO UN CARRITO POR ID
router.get("/:id/products", controller.getCartByUser); // OBTENGO UN CARRITO POR USUARIO
router.post("/:id/products/:idprod", controller.postCart); // AGREGO UN PRODUCTO AL CARRITO
router.delete("/:id", controller.deleteCart); // BORRO UN CARRITO
router.delete("/:id/products/:product", controller.deleteProd); // BORRO UN PRODUCTO
router.delete("", controller.deleteAll); // BORRO TODO

module.exports = router;
