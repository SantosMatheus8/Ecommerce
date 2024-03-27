import { User, UserStatusEnum } from "../domain/models/user";
import { UserRepository } from "../domain/ports/userRepository";
import { UserController } from "../infra/controllers/userController";
import { UserUseCase } from "../use-cases/userUseCase";
import crypto from "crypto";

export class UserFactory {
  private static _instance: UserFactory | null = null;

  static get instance(): UserFactory {
    if (UserFactory._instance === null) {
      UserFactory._instance = new UserFactory();
    }

    return UserFactory._instance;
  }

  create(
    name: string,
    email: string,
    password: string,
    avatar?: string,
    phoneNumber?: string
  ): User {
    const newUser = User.instance;
    newUser.name = name;
    newUser.email = email;
    newUser.password = this.hashPassword(password);
    newUser.avatar = avatar;
    newUser.phoneNumber = phoneNumber;
    newUser.status = UserStatusEnum.PENDING;

    return newUser;
  }

  private hashPassword(password: string): string {
    if (password) {
      const salt = crypto.randomBytes(16).toString("hex");
      return crypto
        .pbkdf2Sync(password, salt, 1000, 10, "sha512")
        .toString("hex");
    }
  }
}

export class UserUserCaseFactory {
  private static _instance: UserUserCaseFactory | null = null;

  static get instance(): UserUserCaseFactory {
    if (UserUserCaseFactory._instance === null) {
      UserUserCaseFactory._instance = new UserUserCaseFactory();
    }

    return UserUserCaseFactory._instance;
  }

  create(userRepository: UserRepository): UserUseCase {
    const userUserCase = UserUseCase.instance;
    userUserCase.userRepository = userRepository;

    return userUserCase;
  }
}

export class UserControllerFactory {
  private static _instance: UserControllerFactory | null = null;

  static get instance(): UserControllerFactory {
    if (UserControllerFactory._instance === null) {
      UserControllerFactory._instance = new UserControllerFactory();
    }

    return UserControllerFactory._instance;
  }

  create(userUserCase: UserUseCase): UserController {
    const userController = UserController.instance;
    userController.userUseCase = userUserCase;

    return userController;
  }
}
