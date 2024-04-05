export class User {
  private static _instance: User | null = null;

  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  phoneNumber?: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  static get instance(): User {
    if (User._instance === null) {
      User._instance = new User();
    }

    return User._instance;
  }
}
