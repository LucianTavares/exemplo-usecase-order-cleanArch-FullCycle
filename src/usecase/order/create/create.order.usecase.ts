import OrderFactory from "../../../domain/checkout/factory/order.factory"
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface"
import { InputCreateOrderDto, OutputCreateOrderDto } from "./create.order.dto"

export default class CreateOrderUseCase {

  private orderRepository: OrderRepositoryInterface

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository
  }

  async execute(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {

    const props = {
      id: input.id,
      customerId: input.customerId,
      items: input.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity
      }))
    }

    const order = OrderFactory.create(props)

    await this.orderRepository.create(order)

    return {
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity
      }))
    }
  }
}