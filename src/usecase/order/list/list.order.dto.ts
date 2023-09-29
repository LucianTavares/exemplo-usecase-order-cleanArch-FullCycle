export interface InputListMyOrdersUseCaseDto {

  customerId: string
}

export interface OutputListMyOrdersUseCaseDto {

  id: string
  customerId: string
  items: {
    id: string,
    productId: string,
    name: string,
    price: number,
    quantity: number
  }[],
  rewardPointsCustomer: number
}