const axios = require("axios");
const util = require("../util");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const crudTest = async () => {
  const product = util.createProduct();
  const update = await util.updateProduct()
  // POST test
  const { data } = await axios.post(PRODAXIOS_URL, product);
  // GET ID test
  const getId = await axios.get(`${PRODAXIOS_URL}/${data._id}`);
  // PUT test
  const put = await axios.put(`${PRODAXIOS_URL}/${data._id}`, update);
  // GET test
  const getAll = await axios.get(PRODAXIOS_URL);
  // DELETE test
  const del = await axios.delete(`${PRODAXIOS_URL}/${data._id}`);
};

module.exports = crudTest();