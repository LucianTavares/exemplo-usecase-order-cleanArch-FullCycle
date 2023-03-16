import CreateOrderUseCase from "./create.order.usecase"

const inputOrderItemOne = {
  id: "1",
  productId: "1",
  productName: "DDD",
  productPrice: 59.90,
  quantity: 1
}

const inputOrderOne = {
  id: "1",
  customerId: "1",
  items: [
    {
      id: inputOrderItemOne.id,
      name: inputOrderItemOne.productName,
      price: inputOrderItemOne.productPrice,
      productId: inputOrderItemOne.productId,
      quantity: inputOrderItemOne.quantity
    }
  ]
}

const MockRepository = () => {

  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test create order use case", () => {

  it("should create a order", async () => {

    const orderRepository = MockRepository()
    const customerRepository = MockRepository()
    const orderCreateUseCase = new CreateOrderUseCase(orderRepository, customerRepository)

    const output = await orderCreateUseCase.execute(inputOrderOne)

    expect(output).toEqual({
      id: expect.any(String),
      customerId: inputOrderOne.customerId,
      total: expect.any(Number),
      items: inputOrderOne.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity
      }))
    })

    expect(output.total).toBe(59.90)
  })
})