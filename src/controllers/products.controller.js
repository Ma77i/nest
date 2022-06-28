// import model
const productModel = require("../models/model.factory");

const logger = require("../log");

module.exports = {
  // obtener todos los productos, ordernarlos y buscar por nombre
  get: async (req, res) => {
    const { orderBy, search } = req.query;

    let products = [];
    const find = search ? { title: { $regex: search, $options: "i" } } : {};
    if (orderBy) {
      const ord = {};
      ord[orderBy] = 1;
      products = await productModel.getModel("product").find(find).sort(ord);
    } else {
      products = await productModel.getModel("product").find(find);
    }

    logger.info(`Productos listados: ${products}`);
    return res.send(products);
  },

  // obtener producto por id
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const getId = await productModel.getModel("product").findOne({ _id: id });
      res.status(200).send(getId);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // crear producto
  post: async (req, res) => {
    const { body } = req;

    try {
      const product = await productModel.getModel("product").create(body);
      res.status(201).send(product);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // actualizar producto
  put: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const update = await productModel.getModel("product").updateOne({ _id: id }, { $set: body });
      res.status(201).send(update);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // borrar producto
  deleteProd: async (req, res) => {
    const { id } = req.params;

    try {
      await productModel.getModel("product").deleteOne({ _id: id });
      res.status(200).send("Product deleted");
    } catch (err) {
      logger.error(`No id find${err}`);
      res.status(500).send(err);
    }
  },

  // borrar todos los productos
  deleteAll: async (req, res) => {
    await productModel.getModel("product").deleteMany({});
    res.status(200).send("Se eliminaron todos los objetos");
  }
};
