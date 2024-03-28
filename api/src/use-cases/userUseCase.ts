import { CreateUser, UpdateUser } from "../domain/dtos/user";
import { User, UserStatusEnum } from "../domain/models/user";
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
      user.avatar,
      user.phoneNumber
    );

    return await this.userRepository.insert(newUser);
  }

  async update(id: number, updateUser: UpdateUser): Promise<User> {
    const user = await this.checkIfUserExists(id);
    await this.checkIfUserExistsByEmail(updateUser.email, id);

    user.name = updateUser.name;
    user.email = updateUser.email;
    user.avatar = updateUser.avatar;
    user.phoneNumber = updateUser.phoneNumber;
    user.updatedAt = new Date();

    return await this.userRepository.update(user);
  }

  async inactivate(id: number): Promise<User> {
    const user = await this.checkIfUserExists(id);

    switch (user.status) {
      case UserStatusEnum.INACTIVE:
        throw new UnprocessableEntityError(
          "Não é possível inativar um usuário que já está inativo"
        );
      case UserStatusEnum.BLOCKED:
        throw new UnprocessableEntityError(
          "Não é possível inativar um usuário bloqueado"
        );
      case UserStatusEnum.PENDING:
        throw new UnprocessableEntityError(
          "Não é possível inativar um usuário pendente"
        );
    }
    user.status = UserStatusEnum.INACTIVE;

    return await this.userRepository.update(user);
  }

  async activate(id: number): Promise<User> {
    const user = await this.checkIfUserExists(id);
    const userExist = await this.userRepository.findActiveByEmail(user.email);

    if (userExist) {
      throw new UnprocessableEntityError(
        "Já existe um usuário ativo ou bloquedo com esse e-mail"
      );
    }
    user.status = UserStatusEnum.ACTIVE;

    return await this.userRepository.update(user);
  }

  async unblock(id: number): Promise<User> {
    const user = await this.checkIfUserExists(id);

    switch (user.status) {
      case UserStatusEnum.ACTIVE:
        throw new UnprocessableEntityError(
          "Não é possível desbloquear um usuário ativo"
        );
      case UserStatusEnum.INACTIVE:
        throw new UnprocessableEntityError(
          "Não é possível desbloquear um usuário inativo"
        );
      case UserStatusEnum.PENDING:
        throw new UnprocessableEntityError(
          "Não é possível desbloquear um usuário pendente"
        );
    }
    user.status = UserStatusEnum.ACTIVE;

    return await this.userRepository.update(user);
  }

  async block(id: number): Promise<User> {
    const user = await this.checkIfUserExists(id);

    switch (user.status) {
      case UserStatusEnum.BLOCKED:
        throw new UnprocessableEntityError(
          "Não é possível bloqquear um usuário que já está bloqueado"
        );
      case UserStatusEnum.INACTIVE:
        throw new UnprocessableEntityError(
          "Não é possível bloquear um usuário inativo"
        );
      case UserStatusEnum.PENDING:
        throw new UnprocessableEntityError(
          "Não é possível bloquear um usuário pendente"
        );
    }
    user.status = UserStatusEnum.BLOCKED;

    return await this.userRepository.update(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.checkIfUserExists(id);

    if (
      user.status !== UserStatusEnum.INACTIVE &&
      user.status !== UserStatusEnum.PENDING
    ) {
      throw new UnprocessableEntityError(
        "Só é possível remover usuários inativos ou pendentes"
      );
    }

    return await this.userRepository.delete(user);
  }

  async findAll(query: PaginatedFindConditions<User>): Promise<Page<User>> {
    return await this.userRepository.paginatedFindBy(query);
  }

  async findById(id: number): Promise<User> {
    const user = await this.checkIfUserExists(id);

    return user;
  }

  private async checkIfUserExists(id: number): Promise<User> {
    const userExists = await this.userRepository.findOneBy({ id });

    if (!userExists) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return userExists;
  }

  private async checkIfUserExistsByEmail(
    email: string,
    id?: number
  ): Promise<void> {
    const userExist = await this.userRepository.findActiveByEmail(email);

    if (userExist && userExist.id !== id) {
      throw new UnprocessableEntityError("E-mail já cadastrado");
    }
  }
}
