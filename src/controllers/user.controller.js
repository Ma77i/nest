/* eslint-disable consistent-return */
// import models
const userModel = require("../models/userModel");

// logger
const logger = require("../log/winston");

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await userModel.find().lean();
    logger.info(`Usuarios: ${users.length}`);
    res.status(200).send(users);
  },

  getUserId: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(404);
    }

    try {
      const user = await userModel.findById({ _id: id }).lean();
      logger.info(`Usuario:  ${user.firstName}`);
      res.status(200).send({ user });
    } catch (err) {
      logger.error(`No id find, ${err}`);
      res.status(500).send(err);
    }
  },

  // borrar todo
  deleteAll: async (req, res) => {
    try {
      await userModel.deleteMany({});
      logger.info("Se eliminaron todos los usuarios");
      res.status(200).send("Empty");
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      await userModel.deleteOne({ _id: id });
      logger.info("Usuario eliminado");
      res.sendStatus(200);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }
};
