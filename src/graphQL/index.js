const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const products = require("./resolvers/products");

module.exports = (app) => {
  try {
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        rootValue: products,
        graphiql: true
      })
    );

  } catch (error) {
    console.log("GQL ERR: ", error);
  }
};
