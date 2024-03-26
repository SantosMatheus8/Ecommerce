import { EntitySchema } from "typeorm";
import { Feature } from "../../../domain/models/feature";

export const featureSchema = new EntitySchema({
  target: Feature,
  name: "features",
  tableName: "features",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    description: {
      type: String,
      nullable: false,
    },
    active: {
      type: Boolean,
      nullable: false,
    },
    isAdmin: {
      name: "is_admin",
      type: Boolean,
      nullable: false,
    },
    createdAt: {
      name: "created_at",
      type: Date,
    },
    updatedAt: {
      name: "updated_at",
      type: Date,
    },
  },
});
