// router
const router = require("express").Router();

// passport
const passport = require("passport");

// middleware
const auth = require("../middlewares/auth");

// import controllers
const productController = require("../controllers/products.controller");
const orderController = require("../controllers/order.controller");
const adminController = require("../controllers/admin.controller");

// GET admin index
router.get("/", auth, adminController.index);

// GET users admin
router.get("/users", auth, adminController.getUsers);

// GET users add user
router.get("/addUser", auth, (req, res) => res.render("admin/addUser"));

// POST add user
router.post(
  "/addUser",
  passport.authenticate("register", {
    successRedirect: "/addAvatar",
    failureRedirect: "/addUser",
    failureFlash: true
  })
);

// GET products admin
router.get("/products", auth, adminController.getProducts);

// GET add products
router.get("/addProduct", auth, (req, res) => res.render("admin/addProduct"));

// POST add product
router.post("/addProduct", productController.post);

// GET pedidos admin
router.get("/orders", auth, adminController.getOrders);

// DELETE orders
router.delete("/orders", auth, orderController.deleteAllOrders);

module.exports = router;
