import { Feature } from "../models/feature";
import { Repository } from "./repository";

export interface FeatureRepository extends Repository<Feature> {
  findByIds(ids: number[]): Promise<Feature[]>
}
