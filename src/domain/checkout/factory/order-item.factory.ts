import OrderItem from "../entity/order_item";

interface OrderItemFactoryProps {
  id: string,
  productId: string,
  name: string,
  price: number
  quantity: number,
}

export default class OrderItemFactory {

  public static create(props: OrderItemFactoryProps): OrderItem {

    return new OrderItem(
      props.id,
      props.productId,
      props.name,
      props.price,
      props.quantity
    )
  }
}