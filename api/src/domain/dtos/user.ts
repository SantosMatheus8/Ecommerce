import { UserStatusEnum } from "../models/user";

export enum UsersOrderByEnum {
  name = "name",
  status = "status",
  email = "email",
}

export type CreateUser = {
  name: string
  email: string
  password: string
  avatar?: string
  phoneNumber?: string
};

export type UserResponse = {
  id: number
  name: string
  email: string
  avatar?: string
  phoneNumber?: string
  status: UserStatusEnum
};

export type QueryUsers = {
  name?: string
  email?: string
  status?: string
  orderBy?: string
  orderDirection?: string
  page?: string
  itemsPerPage?: string
};

export type UpdateUser = {
  name: string
  email: string
  avatar: string
  phoneNumber: string
};
