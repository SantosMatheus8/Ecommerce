import { api } from './api'

type createOrder = {
  userId: string
  products: any[]
}

export const createOrder = async ({
userId,
products
}:createOrder) => {
  const body = { userId, products }
  return api.post('orders/v1/orders', body).then((res) => res)
}

export const getProducts = async () => {
  return await api.get('products/v1/products').then((res) => res)
}

export const getProduct = async (id:string) => {
  return await api.get(`products/v1/products/${id}`).then((res) => res)
}

export const deleteContact = async (id: number) => {
  return api.delete(`contacts/${id}`).then((res) => res)
}