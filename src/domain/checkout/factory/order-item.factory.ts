import OrderItem from "../entity/order_item";

interface OrderItemFactoryProps {
  id: string,
  name: string,
  productId: string,
  price: number
  quantity: number,
}

export default class OrderItemFactory {

  public static create(props: OrderItemFactoryProps): OrderItem[] {

    return new OrderItem(
      props.id,
      props.name,
      props.productId,
      props.price,
      props.quantity
    )
  }
}