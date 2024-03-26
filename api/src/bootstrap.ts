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
// const typeOrmAccessProfileRepository = appDataSource.getRepository(AccessProfile);
// const typeOrmFeatureRepository = appDataSource.getRepository(Feature);
// const typeOrmRoutesFeatureRepository = appDataSource.getRepository(RoutesFeature);
// Repositories
export const userRepository: UserRepository = new TypeORMUserRepository(
  typeOrmUserRepository
);
// const accessProfileRepository = new TypeORMAccessProfileRepository(typeOrmAccessProfileRepository);
// const featureRepository = new TypeORMFeatureRepository(typeOrmFeatureRepository);
// const routesFeatureRepository = new TypeORMRoutesFeatureRepository(typeOrmRoutesFeatureRepository);
// Services

// Kafka
// const kafka = new Kafka({
//   brokers: [process.env.KAFKA_HOST],
// });

// const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });
// const kafkaProducer = new KafkaProducer(producer);
// export const kafkaConsumer = new KafkaConsumer(consumer);

// Services
export const jwtSessionTokenService = new JwtSessionTokenService(
  process.env.JWT_SECRET
);
// export const forgotPasswordTokenService = new JwtForgotPasswordService(
//   process.env.JWT_SECRET
// );

// export const httpGoogleValidatorService = new HttpGoogleValidatorService(
//   process.env.GOOGLE_AUTH_URL
// );

// export const httpAzureValidatorService = new HttpAzureValidatorService(
//   process.env.AZURE_AUTH_URL
// );

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// export const mailerService = new MailerService(
//   sgMail,
//   kafkaConsumer,
//   forgotPasswordTokenService,
//   process.env.FRONTEND_URL,
//   process.env.SENDGRID_SENDER_EMAIL
// );

// Use-Cases
// export conAst userUseCase = new UserUseCase(userRepository, accessProfileRepository);
const userUserCaseS = UserUseCase.instance;
// userUserCaseS.accessProfileRepository = accessProfileRepository;
userUserCaseS.userRepository = userRepository;
export const userUserCase = userUserCaseS;
export const authUseCase = new AuthenticationUseCase(
  userRepository,
  jwtSessionTokenService
);
// const accessProfileUseCase = new AccessProfileUseCase(accessProfileRepository, featureRepository, routesFeatureRepository, userRepository);

// Controllers
const usercontrollerS = UserController.instance;
usercontrollerS.userUseCase = userUserCase;
export const userController = usercontrollerS;
// export const userController = new UserController(userUserCaset);
export const authController = new AuthController(authUseCase);
// export const accessProfileController = new AccessProfileController(accessProfileUseCase);

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
