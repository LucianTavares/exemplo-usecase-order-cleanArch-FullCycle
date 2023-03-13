import { number } from "yup"
import CreateOrderUseCase from "./create.order.usecase"

const inputOrderItem = {
  id: "1",
  productId: "1",
  productName: "DDD",
  productPrice: 59.90,
  quantity: 1
}

const inputOrder = {
  id: "1",
  customerId: "1",
  items: [
    {
      id: inputOrderItem.id,
      name: inputOrderItem.productName,
      price: inputOrderItem.productPrice,
      productId: inputOrderItem.productId,
      quantity: inputOrderItem.quantity
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
    const orderCreateUseCase = new CreateOrderUseCase(orderRepository)

    const output = await orderCreateUseCase.execute(inputOrder)

    expect(output).toEqual({
      id: expect.any(String),
      customerId: expect.any(String),
      total: expect.any(Number),
      items: inputOrder.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity
      }))
    })
  })
})