import { AccessProfile } from "../models/accessProfile";
import { User } from "../models/user";

export enum AccessProfileOrderByEnum {
  id = "id",
  name = "name",
  admin = "admin",
}

export type CreateAccessProfile = {
  name: string
  admin: boolean
  featuresIds: number[]
};

export type AssociateUsersAccessProfile = {
  userIds: number[]
};

export type AssociateUsersAccessProfileResponse = {
  accessProfile: AccessProfile
  users: User[]
};

export type UpdateAccessProfile = {
  name: string
  admin: boolean
  featuresIds: number[]
};

export type QueryAccessProfile = {
  page: string
  itemsPerPage: string
  orderDirection?: string
  name?: string
  admin?: string
  orderBy?: string
};

export type AccessProfileResponse = {
  id: number
  name: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
};

export type AccessProfileResponseWithFeatures = {
  featuresIds: number[]
} & AccessProfileResponse;

export type AccessProfileUsersAssociationResponse = {
  userIds: number[]
  id: number
  name: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
};
