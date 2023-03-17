import OrderFactory from "../../../domain/checkout/factory/order.factory"
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface"
import OrderService from "../../../domain/checkout/service/order.service"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import { InputCreateOrderDto, OutputCreateOrderDto } from "./create.order.dto"

export default class CreateOrderUseCase {

  constructor(private orderRepository: OrderRepositoryInterface, private customerRepository: CustomerRepositoryInterface) { }

  async execute(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {

    const props = {
      id: input.id,
      customerId: input.customerId,
      customerName: input.customerName,
      items: input.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    }

    const order = OrderFactory.create(props)
    const customer = CustomerFactory.create(props.customerName)

    const customerFind = await this.customerRepository.find(order.customerId)

    await Promise.all([
      this.orderRepository.create(order),
      this.customerRepository.create(customerFind)
    ])
    
    const orderService = OrderService.placeOrder(customer, [order.items[0]])

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