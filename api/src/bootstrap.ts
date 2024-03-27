import { User } from "./domain/models/user";

import { AuthController } from "./infra/controllers/authController";
import { UserController } from "./infra/controllers/userController";
import { appDataSource } from "./infra/typeorm/dataSource";
import { TypeORMUserRepository } from "./infra/typeorm/repositories/typeORMUserRepository";

import { AuthenticationUseCase } from "./use-cases/authenticationUseCase";
import { UserUseCase } from "./use-cases/userUseCase";
import { UserRepository } from "./domain/ports/userRepository";

import "dotenv/config";
import { JwtSessionTokenService } from "./infra/jwt/jwtSessionTokenService";

// TypeORM Repositories
export const typeOrmUserRepository = appDataSource.getRepository(User);

export const userRepository: UserRepository = new TypeORMUserRepository(
  typeOrmUserRepository
);

// Services
export const jwtSessionTokenService = new JwtSessionTokenService(
  process.env.JWT_SECRET
);

// Use-Cases
const userUserCaseS = UserUseCase.instance;
userUserCaseS.userRepository = userRepository;
export const userUserCase = userUserCaseS;

export const authUseCase = new AuthenticationUseCase(
  userRepository,
  jwtSessionTokenService
);

// Controllers
const usercontrollerS = UserController.instance;
usercontrollerS.userUseCase = userUserCase;
export const userController = usercontrollerS;

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
