import { User } from "../models/user";
import { Repository } from "./repository";

export interface UserRepository extends Repository<User> {
}
