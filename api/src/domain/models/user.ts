import crypto from "crypto";
import { AccessProfile } from "./accessProfile";

export enum UserStatusEnum {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export class User {
  private static _instance: User | null = null;

  id?: number;
  name: string;
  email: string;
  password: string;
  accessProfiles?: AccessProfile[];
  avatar?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: UserStatusEnum;
  deletedAt?: Date;
  confirmedAt?: Date;

  static get instance(): User {
    if (User._instance === null) {
      User._instance = new User();
    }

    return User._instance;
  }

  private hashPassword(password: string): string {
    if (password) {
      const salt = crypto.randomBytes(16).toString("hex");
      return crypto
        .pbkdf2Sync(password, salt, 1000, 10, "sha512")
        .toString("hex");
    }
  }
}
