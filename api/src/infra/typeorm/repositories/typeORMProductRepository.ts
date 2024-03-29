import { TypeORMRepository } from "./typeORMRepository";
import { ProductRepository } from "../../../domain/ports/productRepository";
import { Product } from "../../../domain/models/product";
import { In } from "typeorm";

export class TypeORMProductRepository extends TypeORMRepository<Product> implements ProductRepository {
  async findByIds(ids: number[]): Promise<Product[]> {
    return await this.repository.findBy({ id: In(ids) });
  }
}
