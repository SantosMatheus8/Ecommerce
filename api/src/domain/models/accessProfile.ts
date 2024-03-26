import { Feature } from "./feature";

export class AccessProfile {
  id?: number;
  name: string;
  admin: boolean;
  features: Feature[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(name: string, admin: boolean, features: Feature[], id?: number, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.features = features;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
