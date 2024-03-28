import { Product } from "../domain/models/product";
import { ProductRepository } from "../domain/ports/productRepository";
import { ProductController } from "../infra/controllers/productController";
import { ProductUseCase } from "../use-cases/productUserCase";

export class ProductFactory {
  private static _instance: ProductFactory | null = null;

  static get instance(): ProductFactory {
    if (ProductFactory._instance === null) {
      ProductFactory._instance = new ProductFactory();
    }

    return ProductFactory._instance;
  }

  create(
    name: string,
    description: string,
    price: number
  ): Product {
    const newProduct = Product.instance;
    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;

    return newProduct;
  }
}

export class ProductUseCaseFactory {
  private static _instance: ProductUseCaseFactory | null = null;

  static get instance(): ProductUseCaseFactory {
    if (ProductUseCaseFactory._instance === null) {
      ProductUseCaseFactory._instance = new ProductUseCaseFactory();
    }

    return ProductUseCaseFactory._instance;
  }

  create(productRepository: ProductRepository): ProductUseCase {
    const productProductCase = ProductUseCase.instance;
    productProductCase.productRepository = productRepository;

    return productProductCase;
  }
}

export class ProductControllerFactory {
  private static _instance: ProductControllerFactory | null = null;

  static get instance(): ProductControllerFactory {
    if (ProductControllerFactory._instance === null) {
      ProductControllerFactory._instance = new ProductControllerFactory();
    }

    return ProductControllerFactory._instance;
  }

  create(productProductCase: ProductUseCase): ProductController {
    const productController = ProductController.instance;
    productController.productUseCase = productProductCase;

    return productController;
  }
}
