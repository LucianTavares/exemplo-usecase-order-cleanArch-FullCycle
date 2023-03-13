import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import ListProductUseCase from "./list.product.usecase"

describe("Test integration for listing product use case", () => {

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

  it("should list a product", async () => {

    const productRepository = new ProductRepository()
    const usecase = new ListProductUseCase(productRepository)
    
    const inputOne = {
      id: "1",
      name: "Clean Code",
      price: 59.90
    }

    const inputTwo = {
      id: "2",
      name: "DDD",
      price: 89.90
    }

    const productOne = new Product(inputOne.id, inputOne.name, inputOne.price)
    await productRepository.create(productOne)

    const productTwo = new Product(inputTwo.id, inputTwo.name, inputTwo.price)
    await productRepository.create(productTwo)

    const output = await usecase.execute({})

    expect(output.products.length).toBe(2)

    expect(output.products[0].id).toBe(productOne.id)
    expect(output.products[0].name).toBe(productOne.name)
    expect(output.products[0].price).toBe(productOne.price)

    expect(output.products[1].id).toBe(productTwo.id)
    expect(output.products[1].name).toBe(productTwo.name)
    expect(output.products[1].price).toBe(productTwo.price)

  })

})