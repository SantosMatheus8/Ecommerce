import { AccessProfile } from "../models/accessProfile";
import { Repository } from "./repository";

export interface AccessProfileRepository extends Repository<AccessProfile> {
  findByIds(ids: number[]): Promise<AccessProfile[]>
  findOne(id: number): Promise<AccessProfile | null>
}
