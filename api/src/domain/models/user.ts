export enum UserStatusEnum {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export class User {
  private static _instance: User | null = null;

  id?: string;
  name: string;
  email: string;
  password: string;
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
}
