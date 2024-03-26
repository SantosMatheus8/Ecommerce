import { EntitySchema } from "typeorm";
import { RoutesFeature } from "../../../domain/models/routesFeature";

export const routesFeatureSchema = new EntitySchema({
  target: RoutesFeature,
  name: "routes",
  tableName: "routes",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    uri: {
      type: String,
      nullable: false,
    },
    verb: {
      type: String,
      nullable: false,
    },
    isPublic: {
      name: "is_public",
      type: Boolean,
      nullable: false,
    },
  },
});
