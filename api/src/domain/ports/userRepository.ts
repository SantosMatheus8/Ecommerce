import { User } from "../models/user";
import { Repository } from "./repository";

export interface UserRepository extends Repository<User> {
  findActiveByEmail(email: string): Promise<User | undefined>
  findByIds(ids: number[]): Promise<User[]>
  findOne(id: number): Promise<User | null>
}
