import { Order } from "../../../domain/models/order";
import { OrderRepository } from "../../../domain/ports/orderRepository";
import { TypeORMRepository } from "./typeORMRepository";

export class TypeORMOrderRepository extends TypeORMRepository<Order> implements OrderRepository {
  async findOneById(id: string): Promise<Order> {
    return await this.repository.findOne({ where: { id }, relations: ["products"] });
  }
}
