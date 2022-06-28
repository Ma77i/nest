const faker = require("faker");
const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    default: faker.vehicle.bicycle()
  },
  description: {
    type: String,
    default: faker.commerce.productDescription()
  },
  price: {
    type: Number,
    default: faker.commerce.price(100, 5000)
  },
  stock: {
    type: Number,
    default: 0
  },
  code: {
    type: String,
    default: faker.vehicle.vin()
  },
  thumbnail: {
    type: String,
    default: faker.image.sports()
  },
  timestamp: {
    type: Number,
    default: Date.now()
  }
});

const Products = mongoose.model("productos", ProductsSchema);

module.exports = Products;
