/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
// import router
const router = require("express").Router();

// multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// passport
const passport = require("passport");

// logger
const logger = require("../log/winston");

// mail sender
const mailSender = require("../notifications/mail");

// twilio sms sender
const twilioSender = require("../notifications/twilio");

// import models
const productModel = require("../models/productsModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");

// import controllers
const orderController = require("../controllers/order.controller");

// middleware
const auth = require("../middlewares/auth");

// GET Main
router.get("/", auth, async (req, res) => {
  const user = req.user;

  try {
    const prods = await productModel.find().lean();
    const cart = await cartModel.findOne({ user: user._id.toString() });
    res.render("main", {
      firstName: user.firstName,
      cartId: cart._id,
      products: prods
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
});

// GET Login
router.get("/login", (req, res) => res.render("login"));

// POST Login
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// GET Register
router.get("/register", async (req, res) => res.render("register"));

// POST Register
router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/addAvatar",
    failureRedirect: "/register",
    failureFlash: true
  })
);

// add avatar image
router.get("/addAvatar", auth, (req, res) => {
  try {
    res.status(200).render("addAvatar");
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});

// upload avatar
router.post("/addAvatar", upload.single("avatar"), orderController.updateAvatar);

// GET Cart
router.get("/cart", auth, async (req, res) => {
  const userId = req.user;

  try {
    const cart = await cartModel.findOne({ user: userId._id.toString() }).lean();
    const products = await Promise.all(
      cart.products.map((pId) => productModel.findById(pId).lean())
    );
    const total = products.reduce((tot, p) => tot + p.price, 0);

    res.render("cart", { cartId: cart._id, products, total });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});

// GET Order
router.get("/order", auth, async (req, res) => {
  const { email, firstName, phone } = req.user;
  const userId = req.user;
  const context = { sent: false };

  const cart = await cartModel.findOne({ user: userId._id.toString() });
  const products = await Promise.all(
    cart.products.map((pId) => productModel.findById(pId).lean())
  );
  const total = products.reduce((tot, p) => tot + p.price, 0);

  try {
    await orderModel.create({
      userId: userId._id.toString(),
      total
    });
    cart.products = [];
    await cart.save();

    const prodElements = products.map((p) => `<li>${p.title}</li>`);
    const template = `
        <h1 style="color: blue;"> Tu pedido esta siendo procesado </h1>
        <p>Aqui tus productos: </p>
        <ul>
          ${prodElements.join(" ")}
        </ul>
      `;
    mailSender.send(template, email, firstName);
    twilioSender.sendSms(firstName, email);
    twilioSender.sendWhatsapp(phone, firstName, email);

    context.sent = true;
    logger.info("Orden realizada con exito");
  } catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).send(err);
  }

  res.render("order", context);
});

// GET profile
router.get("/account", auth, async (req, res) => {
  const { firstName, lastName, avatar, userName, email } = req.user;
  res.render("account", { firstName, lastName, avatar, userName, email });
});

// logout
router.get("/logout", auth, (req, res) => {
  const { firstName } = req.user;
  req.logOut();
  res.render("logout", { firstName });
});

// error
router.get("*", (req, res) => {
  logger.warn("la ruta no existe");
  res.status(404).send("Not Found");
});

module.exports = router;
