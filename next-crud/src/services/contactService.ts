import { api } from './api'

type createContact = {
  name: string
  birthday: string
  email: string
  telephone: string
  description: string
  surname: string
}

export const createContact = async ({
  name,
  birthday,
  email,
  telephone,
  description,
  surname,
}: createContact) => {
  const body = { name, birthday, email, telephone, description, surname }
  return api.post('contacts', body).then((res) => res)
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

export const updateContact = async (id: string, body: createContact) => {
  return api.put(`contacts/${id}`, body).then((res) => res)
}
