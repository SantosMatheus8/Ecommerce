import { User } from "./domain/models/user";

import { AuthController } from "./infra/controllers/authController";
import { appDataSource } from "./infra/typeorm/dataSource";
import { TypeORMUserRepository } from "./infra/typeorm/repositories/typeORMUserRepository";

import { AuthenticationUseCase } from "./use-cases/authenticationUseCase";
import { UserRepository } from "./domain/ports/userRepository";

import "dotenv/config";
import { JwtSessionTokenService } from "./infra/jwt/jwtSessionTokenService";
import { UserControllerFactory, UserUserCaseFactory } from "./factories/userFactory";
import { Product } from "./domain/models/product";
import { TypeORMProductRepository } from "./infra/typeorm/repositories/typeORMProductRepository";
import { ProductRepository } from "./domain/ports/productRepository";
import { ProductControllerFactory, ProductUseCaseFactory } from "./factories/productFactory";

// TypeORM Repositories
export const typeOrmUserRepository = appDataSource.getRepository(User);
export const typeOrmProductRepository = appDataSource.getRepository(Product);

export const userRepository: UserRepository = new TypeORMUserRepository(
  typeOrmUserRepository
);
export const productRepository: ProductRepository = new TypeORMProductRepository(typeOrmProductRepository);

// Services
export const jwtSessionTokenService = new JwtSessionTokenService(
  process.env.JWT_SECRET
);

// Use-Cases
export const userUserCase = UserUserCaseFactory.instance.create(userRepository);
export const productUserCase = ProductUseCaseFactory.instance.create(productRepository);

export const authUseCase = new AuthenticationUseCase(
  userRepository,
  jwtSessionTokenService
);

// Controllers
export const userController = UserControllerFactory.instance.create(userUserCase);
export const productController = ProductControllerFactory.instance.create(productUserCase);

export const authController = new AuthController(authUseCase);

/**
 * This function initialize all the connections to remote services and resolve then when they are ready to be utilized.
 */
export async function boostrap(): Promise<void> {
  await appDataSource.initialize();
}

/**
 * This function closes and flush all the connections, preparing the application for graceful shutdown.
 */
export async function shutdown(): Promise<void> {
  await appDataSource.destroy();
}
