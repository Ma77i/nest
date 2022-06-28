/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
// import models
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

// twilio
const twilioSender = require("../notifications/twilio");

// logger
const logger = require("../log/winston");

// obtengo todas las ordenes de pedido
exports.getAll = async (req, res) => {
  const data = await orderModel.find().lean();
  logger.info(`Ordenes: ${data.length}`);
  res.status(200).send(data);
};

// guardo las ordenes en la db
exports.save = async (req, res) => {
  const order = await orderModel.create();
  logger.info(`Orden:\n${order}`);
  res.status(201).send(order);
};

// elimino todas las ordenes
exports.deleteAllOrders = async (req, res) => {
  await orderModel.deleteMany();
  logger.info("Ordenes eliminadas con exito");
  res.status(200).redirect("/");
};

// obtengo la order mediante id de usuario
exports.getByUser = async (req, res) => {
  const userId = req.user;

  const order = await orderModel.findOne({ userId: userId._id }).lean();

  if (!order) {
    return {};
  }

  logger.info(`Orden del usuario con id: ${order.userId}`);
  res.status(200).send(order);
};

// upload image
exports.updateAvatar = async (req, res, next) => {
  const img = req.file;
  if (!img) {
    logger.warn("Add a image");
  }
  const userId = req.user;
  try {
    await userModel.findByIdAndUpdate(
      { _id: userId._id },
      { avatar: `/static/img/${img.originalname}` }
    );
    res.status(201).redirect("/");
  } catch (err) {
    logger.error(err);
    console.log(err);
    res.status(500).send(err);
  }
};

// update sent order
exports.updateSendOrder = async (req, res) => {
  const { id } = req.params;
  const { firstName, email } = req.user;

  if (!id) {
    return res.sendStatus(404);
  }

  try {
    const order = await orderModel.findById({ _id: id });
    order.send = true;
    await order.save();

    twilioSender.sendSms(firstName, email);
    res.sendStatus(202);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
