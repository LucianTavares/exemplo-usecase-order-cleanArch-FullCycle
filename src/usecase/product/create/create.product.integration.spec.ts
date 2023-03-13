import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import CreateProductUseCase from "./create.product.usecase"

describe("Test integration create a product use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {

    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)
    
    const input = {
      id: "1",
      name: "Clean Code",
      price: 59.90
    }

    const product = new Product(input.id, input.name, input.price)
    await productRepository.create(product)

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: "Clean Code",
      price: 59.90
    })

  })

})