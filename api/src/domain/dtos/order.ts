export type CreateOrder = {
  userId: number
  productsIds: number[]
};

export enum OrdersOrderByEnum {
  user = "user",
}

export type QueryOrders = {
  name?: string
  price?: string
  description?: string
  orderBy?: string
  orderDirection?: string
  page?: string
  itemsPerPage?: string
};
