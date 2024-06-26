import { CreateUser, UpdateUser } from "../domain/dtos/user";
import { User } from "../domain/models/user";
import { UserRepository } from "../domain/ports/userRepository";
import { Page, PaginatedFindConditions } from "../domain/dtos/generic";
import { NotFoundError, UnprocessableEntityError } from "../domain/dtos/errors";
import { UserFactory } from "../factories/userFactory";

export class UserUseCase {
  private static _instance: UserUseCase | null = null;
  userRepository: UserRepository;
  static get instance(): UserUseCase {
    if (UserUseCase._instance === null) {
      UserUseCase._instance = new UserUseCase();
    }

    return UserUseCase._instance;
  }

  async create(user: CreateUser): Promise<User> {
    await this.checkIfUserExistsByEmail(user.email);

    const newUser = UserFactory.instance.create(
      user.name,
      user.email,
      user.password,
      user.isAdmin,
      user.phoneNumber
    );

    return await this.userRepository.insert(newUser);
  }

  async update(id: string, updateUser: UpdateUser): Promise<User> {
    const user = await this.checkIfUserExists(id);
    await this.checkIfUserExistsByEmail(updateUser.email, id);

    user.name = updateUser.name;
    user.email = updateUser.email;
    user.avatar = updateUser.avatar;
    user.phoneNumber = updateUser.phoneNumber;
    user.updatedAt = new Date();

    return await this.userRepository.update(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.checkIfUserExists(id);

    return await this.userRepository.delete(user);
  }

  async findAll(query: PaginatedFindConditions<User>): Promise<Page<User>> {
    return await this.userRepository.paginatedFindBy(query);
  }

  async findById(id: string): Promise<User> {
    const user = await this.checkIfUserExists(id);

    return user;
  }

  private async checkIfUserExists(id: string): Promise<User> {
    const userExists = await this.userRepository.findOneBy({ id });

    if (!userExists) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return userExists;
  }

  private async checkIfUserExistsByEmail(
    email: string,
    id?: string
  ): Promise<void> {
    const userExist = await this.userRepository.findOneBy({ email });

    if (userExist && userExist.id !== id) {
      throw new UnprocessableEntityError("E-mail já cadastrado");
    }
  }
}
