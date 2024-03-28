import { TypeORMRepository } from "./typeORMRepository";
import { ProductRepository } from "../../../domain/ports/productRepository";
import { Product } from "../../../domain/models/product";

export class TypeORMProductRepository extends TypeORMRepository<Product> implements ProductRepository {
}
