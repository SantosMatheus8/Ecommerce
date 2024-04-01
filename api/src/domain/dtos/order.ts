export type CreateOrder = {
  userId: string
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
