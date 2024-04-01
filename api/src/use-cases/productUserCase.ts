import { CreateProduct, UpdateProduct } from "../domain/dtos/product";
import { Product } from "../domain/models/product";
import { ProductRepository } from "../domain/ports/productRepository";
import { Page, PaginatedFindConditions } from "../domain/dtos/generic";
import { NotFoundError } from "../domain/dtos/errors";
import { ProductFactory } from "../factories/productFactory";

export class ProductUseCase {
  private static _instance: ProductUseCase | null = null;
  productRepository: ProductRepository;
  static get instance(): ProductUseCase {
    if (ProductUseCase._instance === null) {
      ProductUseCase._instance = new ProductUseCase();
    }

    return ProductUseCase._instance;
  }

  async create(product: CreateProduct): Promise<Product> {
    const newProduct = ProductFactory.instance.create(
      product.name,
      product.description,
      product.price,
      product.quantity
    );

    return await this.productRepository.insert(newProduct);
  }

  async update(id: string, updateProduct: UpdateProduct): Promise<Product> {
    const product = await this.checkIfProductExists(id);

    product.name = updateProduct.name;
    product.price = updateProduct.price;
    product.description = updateProduct.description;
    product.updatedAt = new Date();

    return await this.productRepository.update(product);
  }

  async delete(id: string): Promise<void> {
    const product = await this.checkIfProductExists(id);

    return await this.productRepository.delete(product);
  }

  async findAll(query: PaginatedFindConditions<Product>): Promise<Page<Product>> {
    return await this.productRepository.paginatedFindBy(query);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.checkIfProductExists(id);

    return product;
  }

  private async checkIfProductExists(id: string): Promise<Product> {
    const productExists = await this.productRepository.findOneBy({ id });

    if (!productExists) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return productExists;
  }
}
