export interface InputCreateOrderDto {
  id: string,
  customerId: string,
  customerName: string,
  items: {
    id: string,
    productId: string,
    name: string,
    price: number,
    quantity: number
  }[]
}

export interface OutputCreateOrderDto {
  id: string,
  customerId: string,
  total: number,
  items: {
    id: string,
    productId: string,
    name: string,
    price: number,
    quantity: number
  }[],
  rewardPointsCustomer: number
}