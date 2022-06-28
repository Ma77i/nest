const router = require("express").Router();

const controller = require("../controllers/products.controller");

router.get("", controller.get); // GET PRODUCTS
router.post("", controller.post); // SAVE PRODUCT
router.put("/:id", controller.put); // UPDATE PRODUCT
router.get("/:id", controller.getById); // GET PRODUCT BY ID
router.delete("/:id", controller.deleteProd); // DELETE PRODUCT BY ID
router.delete("", controller.deleteAll); // DELETE ALL

module.exports = router;
