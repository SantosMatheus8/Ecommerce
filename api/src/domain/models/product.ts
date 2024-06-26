export class Product {
  private static _instance: Product | null = null;

  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;

  static get instance(): Product {
    if (Product._instance === null) {
      Product._instance = new Product();
    }

    return Product._instance;
  }
}
