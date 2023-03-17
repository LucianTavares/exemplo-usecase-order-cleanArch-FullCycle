import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import CreateOrderUseCase from "./create.order.usecase"

const inputCustomer = {
  id: "1",
  name: "Lucian"
}

const inputOrderItemOne = {
  productId: "1",
  productName: "DDD",
  productPrice: 59.90,
  quantity: 1
}

const inputOrderOne = {
  customerId: inputCustomer.id,
  customerName: inputCustomer.name,
  items: [
    {
      name: inputOrderItemOne.productName,
      price: inputOrderItemOne.productPrice,
      productId: inputOrderItemOne.productId,
      quantity: inputOrderItemOne.quantity
    }
  ]
}

const customer = CustomerFactory.create("Lucian")

const MockRepository = () => {

  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
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
      customerId: customer.id,
      total: 59.90,
      items: inputOrderOne.items.map((item, key) => ({
        id: key + 1 + "",
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