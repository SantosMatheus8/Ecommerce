import { User } from "../models/user";
import { RepositoryInterface } from "../shared/repositoryInterface";

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  findActiveByEmail(email: string): Promise<User | undefined>
}
