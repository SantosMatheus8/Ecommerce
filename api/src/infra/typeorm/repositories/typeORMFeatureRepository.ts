import { In } from "typeorm";
import { Feature } from "../../../domain/models/feature";
import { FeatureRepository } from "../../../domain/ports/featureRepository";
import { TypeORMRepository } from "./typeORMRepository";

export class TypeORMFeatureRepository extends TypeORMRepository<Feature> implements FeatureRepository {
  public async findByIds(ids: number[]): Promise<Feature[]> {
    return await this.repository.find({ where: { id: In(ids) } });
  }
}
