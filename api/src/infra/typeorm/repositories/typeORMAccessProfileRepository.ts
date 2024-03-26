import { In } from "typeorm";
import { AccessProfile } from "../../../domain/models/accessProfile";
import { AccessProfileRepository } from "../../../domain/ports/accessProfileRepository";
import { TypeORMRepository } from "./typeORMRepository";

export class TypeORMAccessProfileRepository extends TypeORMRepository<AccessProfile> implements AccessProfileRepository {
  public async findByIds(ids: number[]): Promise<AccessProfile[]> {
    return await this.repository.find({ where: { id: In(ids) } });
  }

  public async findOne(id: number): Promise<AccessProfile | null> {
    return await this.repository.findOne({ where: { id }, relations: ["features"] });
  }
}
