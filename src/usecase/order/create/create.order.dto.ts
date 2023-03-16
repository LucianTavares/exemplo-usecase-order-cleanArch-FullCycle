export interface InputCreateOrderDto {
  id: string,
  customerId: string,
  items: {
    id: string,
    name: string,
    productId: string,
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
    name: string,
    price: number,
    productId: string,
    quantity: number
  }[]
}