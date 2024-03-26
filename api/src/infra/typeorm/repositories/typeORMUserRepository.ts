import { In } from "typeorm";
import { User, UserStatusEnum } from "../../../domain/models/user";
import { UserRepository } from "../../../domain/ports/userRepository";
import { TypeORMRepository } from "./typeORMRepository";

export class TypeORMUserRepository extends TypeORMRepository<User> implements UserRepository {
  public async findActiveByEmail(email: string): Promise<User> {
    return await this.repository.findOne({
      where: {
        email,
        status: In([UserStatusEnum.ACTIVE, UserStatusEnum.BLOCKED]),
      },
    });
  }

  public async findByIds(ids: number[]): Promise<User[]> {
    return await this.repository.find({ where: { id: In(ids) } });
  }

  public async findOne(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }
}
