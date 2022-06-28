const userModel = require('./userModel')
const pedidoModel = require('./orderModel')
const productModel = require('./productsModel')

// abstract factory
class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case 'user':
        return userModel
      case 'pedido':
        return pedidoModel
      case 'product':
        return productModel
      default:
        throw new Error('modelo no existe')
    }
  }
}

module.exports = ModelFactory
