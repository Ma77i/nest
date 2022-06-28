const faker = require("faker");


module.exports = {

  createProduct: async () => ({
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.paragraph(),
    thumbnail: faker.image.imageUrl(),
    stock: faker.datatype.number(),
    code: faker.random.alphaNumeric(),
    timestamp: Date.now()
  }),


  updateProduct: async () => ({
    title: "Prueba axios",
    price: 0000,
    description: "prueba axios",
    thumbnail: faker.image.imageUrl(),
    stock: 0000,
    code: 0000,
    timestamp: Date.now()
  }),

  createUser: async () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    timestamp: Date.now(),
    avatar: faker.image.imageUrl(),
    userName: faker.internet.userName(),
    phone: faker.phone.phoneNumber(),
    adress: faker.address.streetAddress()
  }),

  updateUser: async () => ({
    firstName: "Pruebaaxios",
    lastName: "Pruebaaxios",
    email: "",
    password: "",
    timestamp: Date.now(),
    avatar: faker.image.imageUrl(),
    userName: "",
    phone: faker.phone.phoneNumber(),
    adress: faker.address.streetAddress()
  }),
};
