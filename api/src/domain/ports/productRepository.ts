import { Product } from "../models/product";
import { Repository } from "./repository";

export interface ProductRepository extends Repository<Product> {
  findByIds(ids: number[]): Promise<Product[]>
}
