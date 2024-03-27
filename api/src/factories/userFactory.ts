import { User } from "../domain/models/user";
import { UserController } from "../infra/controllers/userController";
import { UserUseCase } from "../use-cases/userUseCase";

export class UserFactory {
  private static _instance: UserFactory | null = null;

  static get instance(): UserFactory {
    if (UserFactory._instance === null) {
      UserFactory._instance = new UserFactory();
    }

    return UserFactory._instance;
  }

  getUser(): User {
    return User.instance;
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

  getUserUseCase(): UserUseCase {
    return UserUseCase.instance;
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

  getUserController(): UserController {
    return UserController.instance;
  }
}
