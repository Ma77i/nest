// Import router
const router = require("express").Router();

// Controllers
const controller = require("../controllers/user.controller");

router.get("", controller.getAllUsers); // GET all users
router.get("/:id", controller.getUserId); // GET user by id
router.delete("", controller.deleteAll); // DELETE all users
router.delete("/:id", controller.deleteOne); // DELETE one user

module.exports = router;
