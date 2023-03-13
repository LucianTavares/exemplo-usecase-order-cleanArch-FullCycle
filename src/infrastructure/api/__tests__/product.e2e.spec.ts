import { app, sequelize } from "../express"
import request from 'supertest'

describe("E2E test for product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {

    const response = await request(app)
      .post("/product")
      .send({
        name: "Clean Code",
        price: 59.90
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Clean Code")
    expect(response.body.price).toBe(59.90)
  })

  it("should not create a product", async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: "Xpto"
      })

    expect(response.status).toBe(500)
  })

  it("should list all product", async () => {

    const productCreatedOne = await request(app)
      .post("/product")
      .send({
        name: "Clean Code",
        price: 59.90
      })

    expect(productCreatedOne.status).toBe(200)

    const productCreatedTwo = await request(app)
      .post("/product")
      .send({
        name: "DDD",
        price: 89.90
      })

    expect(productCreatedTwo.status).toBe(200)

    const ListProducts = await request(app)
      .get("/product")
      .send()

    expect(ListProducts.status).toBe(200)
    expect(ListProducts.body.products.length).toBe(2)

    const productOne = ListProducts.body.products[0]
    expect(productOne.name).toBe("Clean Code")
    expect(productOne.price).toBe(59.90)

    const productTwo = ListProducts.body.products[1]
    expect(productTwo.name).toBe("DDD")
    expect(productTwo.price).toBe(89.90)

  })

})