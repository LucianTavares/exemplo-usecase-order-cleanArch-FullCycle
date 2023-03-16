import Order from "../../../domain/checkout/entity/order"
import OrderItem from "../../../domain/checkout/entity/order_item"
import OrderItemFactory from "../../../domain/checkout/factory/order-item.factory"
import OrderFactory from "../../../domain/checkout/factory/order.factory"
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface"
import OrderService from "../../../domain/checkout/service/order.service"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import { InputCreateOrderDto, OutputCreateOrderDto } from "./create.order.dto"

export default class CreateOrderUseCase {

  constructor(private orderRepository: OrderRepositoryInterface, private customerRepository: CustomerRepositoryInterface) { }

  async execute(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {

    const props = {
      id: input.id,
      customerId: input.customerId,
      items: input.items.map((item) => ({
        id: item.id,
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    }

    const order = OrderFactory.create(props)

    const customer = await this.customerRepository.find(input.customerId)

    const orderService = OrderService.placeOrder(customer, [order.items])

    await Promise.all([
      this.orderRepository.create(order),
      this.customerRepository.create(customer)
    ])

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