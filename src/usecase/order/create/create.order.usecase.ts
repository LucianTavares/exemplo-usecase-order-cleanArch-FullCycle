import OrderItemFactory from "../../../domain/checkout/factory/order-item.factory"
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface"
import OrderService from "../../../domain/checkout/service/order.service"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import { InputCreateOrderDto, OutputCreateOrderDto } from "./create.order.dto"

export default class CreateOrderUseCase {

  constructor(private orderRepository: OrderRepositoryInterface, private customerRepository: CustomerRepositoryInterface) { }

  async execute(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {

    const items = input.items.map((orderItem, key) => OrderItemFactory.create({
      ...orderItem,
      id: key + 1 + ""
    }))

    const customer = await this.customerRepository.find(input.customerId)

    const order = OrderService.placeOrder(customer, items)

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
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      rewardPointsCustomer: customer.rewardPoints
    }
  }
}