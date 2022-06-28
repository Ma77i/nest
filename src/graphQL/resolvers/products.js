const ModelFactory = require('../../models/model.factory')
const productModel = ModelFactory.getModel('product')
const logger = require("../../log");

module.exports = {
  createProduct: async (parent, args) => {

    try {
      const product = await productModel.create(args.product);
      logger.info(`Producto creado: ${product}`);
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    };
  // return await productModel.create(args.product)
  },


  getAllProducts: () => {
    try {
      const products = productModel.find({});
      logger.info(`Productos obtenidos: ${products}`);
      return products;
    } catch (error) {
      logger.error(error);
    }
    //return await productModel.getModel("product").find();
  },

  getProduct: async (parent, args) => {
    console.log(args);
    try {
      const product = await productModel.findOne(args._id);
      logger.info(`Producto obtenido: ${product}`);
      return product;
    } catch (error) {
      logger.error(error);
    }
  }
};
