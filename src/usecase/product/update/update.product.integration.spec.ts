import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "../create/create.product.usecase"
import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase"

describe("Test integration update a product use case", () => {

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

  it("should update a product", async () => {

    const productRepository = new ProductRepository()
    
    const input = {
      id: "1",
      name: "Clean Code",
      price: 59.90
    }
    
    const updateInput = {
      id: "1",
      name: "Código Limpo",
      price: 69.90
    }
    
    const product = new Product(input.id, input.name, input.price)
    await productRepository.create(product)
    
    const usecase = new UpdateProductUseCase(productRepository)

    const output = await usecase.execute(updateInput)

    expect(output).toEqual(updateInput)

  })

})