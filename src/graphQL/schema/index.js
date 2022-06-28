const { buildSchema } = require("graphql");

const schema = `
    type Product {
        id: String!
        title: String
        price: Int
        description: String
        thumbnail: String
        code: String
        stock: Int
        timestamp: String
    }

    input ProductInput {
        title: String
        price: Int
        description: String
        thumbnail: String
        code: String
        stock: Int
        timestamp: String
    }

    type Query {
        getAllProducts: [Product]
        getProduct(id: String!): Product
    }

    type Mutation {
        createProduct(product: ProductInput): Product
    }
`;

module.exports = buildSchema(schema);
