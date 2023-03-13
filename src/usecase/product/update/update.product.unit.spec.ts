import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create(
  "Clean Code",
  59.90
)

const input = {
  id: product.id,
  name: "Código Limpo",
  price: 49.90
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn()
  }
}

describe("Unit test for product update use case", () => {

  it("should update a product", async () => {
    const ProductRepository = MockRepository()
    const productUpdateUseCase = new UpdateProductUseCase(ProductRepository)

    const output = await productUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})