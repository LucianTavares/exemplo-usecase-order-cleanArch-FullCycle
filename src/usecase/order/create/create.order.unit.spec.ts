import CreateOrderUseCase from "./create.order.usecase"

const inputCustomer = {
  id: "1",
  name: "Lucian"
}

const inputOrderItemOne = {
  id: "1",
  productId: "1",
  productName: "DDD",
  productPrice: 59.90,
  quantity: 1
}

const inputOrderOne = {
  id: "1",
  customerId: inputCustomer.id,
  customerName: inputCustomer.name,
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
    find: jest.fn().mockReturnValue(Promise.resolve(inputCustomer.id)),
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
      customerId: expect.any(String),
      total: expect.any(Number),
      items: inputOrderOne.items.map((item) => ({
        id: item.id,
        name: item.name,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity
      })),
      rewardPointsCustomer: expect.any(Number)
    })

    expect(output.total).toBe(59.90)
    expect(output.rewardPointsCustomer).toBe(29.95)
  })
})