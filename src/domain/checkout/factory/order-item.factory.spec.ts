import { v4 as uuid } from 'uuid'
import OrderItemFactory from './order-item.factory'

describe("Order items factory unit test", () => {

  it("should create an order items", async () => {

    const orderItemProps = {
      id: uuid(),
      productId: uuid(),
      name: "DDD",
      price: 100,
      quantity: 1
    }

    const orderItem = OrderItemFactory.create(orderItemProps)

    expect(orderItem.id).toBeDefined()
    expect(orderItem.name).toBe("DDD")
    expect(orderItem.productId).toBeDefined()
    expect(orderItem.price).toBe(100)
    expect(orderItem.quantity).toBe(1)
  })
})