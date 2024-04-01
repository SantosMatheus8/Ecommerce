import { Product } from "./product";
import { User } from "./user";

export class Order {
  private static _instance: Order | null = null;

  id?: string;
  user: User;
  products: Product[];
  totalValue: number;
  createdAt?: Date;
  updatedAt?: Date;

  static get instance(): Order {
    if (Order._instance === null) {
      Order._instance = new Order();
    }

    return Order._instance;
  }
}
