// import models
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productsModel = require("../models/productsModel");

module.exports = {
  index: (req, res) => {
    const { firstname, lastname } = req.user;
    res.render("admin/index", { name: `${firstname} ${lastname}` });
  },

  getUsers: async (req, res) => {
    const users = await userModel.find().lean();
    res.render("admin/users", { users });
  },

  getProducts: async (req, res) => {
    const products = await productsModel.find().lean();
    res.render("admin/products", { products: products });
  },

  getOrders: async (req, res) => {
    const orders = await orderModel.find().lean();
    res.render("admin/orders", { orders });
  }
};
