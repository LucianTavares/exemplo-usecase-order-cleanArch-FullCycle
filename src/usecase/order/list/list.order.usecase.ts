import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListMyOrdersUseCaseDto, OutputListMyOrdersUseCaseDto } from "./list.order.dto";

export default class ListMyOrdersUseCase {

  constructor(
    private productRepository: ProductRepositoryInterface,
    private orderRepository: OrderRepositoryInterface,
    private customerRepository: CustomerRepositoryInterface
  ) { }

  async execute(input: InputListMyOrdersUseCaseDto): Promise<OutputListMyOrdersUseCaseDto[]> {

    const customer = await this.customerRepository.find(input.customerId)

    const orders = await this.orderRepository.findCustomerById(input.customerId)

    if (!orders || orders.length === 0) {
      throw new Error("Order not found")
    }



    const initValue: string[] = []
    //se caso não existir lançar um erro de NotFound
    const productId = orders.reduce((acc, order) => [...acc, ...order.items.map(product => product.productId)], initValue)

    if (!productId) {
      throw new Error("Product not found")
    }

    const products = await this.productRepository.findByIds(productId)


    return {

      id: orders.id,
      customerId: input.customerId,
      items: orders.items.map((item) => {
        const product = products.find(p => p.id === item.productId)
        return {
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }
      }),
      rewardPointsCustomer: customer.rewardPoints

    }
  }
}

