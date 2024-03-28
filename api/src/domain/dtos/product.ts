export type CreateProduct = {
  name: string
  description: string
  price: number
};

export type UpdateProduct = CreateProduct;

export enum ProductsOrderByEnum {
  name = "name",
  price = "status",
}

export type QueryProducts = {
  name?: string
  price?: string
  description?: string
  orderBy?: string
  orderDirection?: string
  page?: string
  itemsPerPage?: string
};
