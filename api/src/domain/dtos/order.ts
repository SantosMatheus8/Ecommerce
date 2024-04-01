import { Product } from "../models/product";

export type CreateOrder = {
  userId: string
  products: Product[]
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
