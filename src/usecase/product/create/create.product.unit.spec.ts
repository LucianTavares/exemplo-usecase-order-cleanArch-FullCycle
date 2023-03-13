import CreateProducUseCase from "./create.product.usecase"

const input = {
  name: "Clean Code",
  price: 59.90
}

const MockRepository = () => {

  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit tests create a product use case", () => {

  it("should create a product", async () => {

    const productRepository = MockRepository()
    const productCreateUseCase = new CreateProducUseCase(productRepository)

    const output = await productCreateUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })

  })

})