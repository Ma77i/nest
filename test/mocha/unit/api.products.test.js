const supertest = require("supertest");
const expect = require("chai").expect;
const util = require("../../util");

const API_URL = "https://ecoderce.herokuapp.com";

describe("API Products", () => {
  const agent = supertest(API_URL);

  // before( () => {
  //   console.log("connecting to mongo")
  //   mongoose.connect("mongodb://localhost/test-funct")
  // });

  //  after(() => {
  //   mongoose.disconnect();
  // })

  // it("should connect to the db", (done) => {
  //   assert.strict(mongoose.connection.readyState, 1);
  //   done()
  // });

  it("it should GET all the products", async () => {
    const res = await agent.get("/api/products");
    //console.log(res.body)
    expect(res.status).to.equal(200);
  })
  
  it("it should POST a new product", async () => {
    const product = await util.createProduct();
    const res = await agent.post("/api/products").send(product);
    const body = res.body;
    expect(body.name).to.equal(product._id);
  })
  
  it("it should GET product ID", async () => {
    const res = await agent.get("/api/products/62a4e57d5fb3417f72d22d1b")
    expect(res.status).to.equal(200);
  })

  it("it should DELETE a product", async () => {
    const res = await agent.delete("/api/products/62a4e23e5fb3417f72d22d15")
    expect(res.status).to.equal(200);
  })

  it("it should PUT/UPDATE a product", async () => {
    const updateProduct = await util.updateProduct();
    const res = await agent.put("/api/products/62a4e57d5fb3417f72d22d1b").send(updateProduct);
    const body = res.body;
    expect(body.name).to.equal(updateProduct.name);
  })

  

});
