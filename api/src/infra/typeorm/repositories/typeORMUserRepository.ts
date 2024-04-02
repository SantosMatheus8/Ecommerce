import { User } from "../../../domain/models/user";
import { UserRepository } from "../../../domain/ports/userRepository";
import { TypeORMRepository } from "./typeORMRepository";

export class TypeORMUserRepository extends TypeORMRepository<User> implements UserRepository {

}
