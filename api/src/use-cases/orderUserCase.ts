import { CreateOrder } from "../domain/dtos/order";
import { Order } from "../domain/models/order";
import { Page, PaginatedFindConditions } from "../domain/dtos/generic";
import { NotFoundError, UnprocessableEntityError } from "../domain/dtos/errors";
import { OrderFactory } from "../factories/orderFactory";
import { OrderRepository } from "../domain/ports/orderRepository";
import { UserRepository } from "../domain/ports/userRepository";
import { ProductRepository } from "../domain/ports/productRepository";

export class OrderUseCase {
  private static _instance: OrderUseCase | null = null;
  orderRepository: OrderRepository;
  userRepository: UserRepository;
  productRepository: ProductRepository;

  static get instance(): OrderUseCase {
    if (OrderUseCase._instance === null) {
      OrderUseCase._instance = new OrderUseCase();
    }

    return OrderUseCase._instance;
  }

  async create(order: CreateOrder): Promise<Order> {
    const user = await this.userRepository.findOneBy({ id: order.userId });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const products = await this.productRepository.findByIds(order.productsIds);

    if (products.length === 0) {
      throw new UnprocessableEntityError("Nenhum produto encontrado");
    }
    const updatedProducts = products.map(product => { product.quantity = product.quantity - 1; return product; });
    await this.productRepository.insertMany(updatedProducts);

    const prices = products.map(product => product.price);
    const totalPrice = prices.reduce((total, price) => total + price, 0);

    const newOrder = OrderFactory.instance.create(
      user,
      products,
      totalPrice
    );

    return await this.orderRepository.insert(newOrder);
  }

  async delete(id: string): Promise<void> {
    const order = await this.checkIfOrderExists(id);

    return await this.orderRepository.delete(order);
  }

  async findAll(query: PaginatedFindConditions<Order>): Promise<Page<Order>> {
    return await this.orderRepository.paginatedFindBy(query);
  }

  async findById(id: string): Promise<Order> {
    const order = await this.checkIfOrderExists(id);

    return order;
  }

  private async checkIfOrderExists(id: string): Promise<Order> {
    const orderExists = await this.orderRepository.findOneBy({ id });

    if (!orderExists) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return orderExists;
  }
}
