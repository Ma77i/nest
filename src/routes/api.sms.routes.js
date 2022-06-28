// router
const router = require("express").Router();

// controllers
const orderController = require("../controllers/order.controller");

router.post("/:orderId", orderController.updateSendOrder);

module.exports = router;
