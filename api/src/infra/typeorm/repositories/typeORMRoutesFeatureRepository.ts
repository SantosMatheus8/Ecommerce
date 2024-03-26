import { RoutesFeature } from "../../../domain/models/routesFeature";
import { RoutesFeatureRepository } from "../../../domain/ports/routesFeatureRepository";
import { TypeORMRepository } from "./typeORMRepository";

export class TypeORMRoutesFeatureRepository extends TypeORMRepository<RoutesFeature> implements RoutesFeatureRepository {

}
