import { EntitySchema } from "typeorm";
import { AccessProfile } from "../../../domain/models/accessProfile";
import { Feature } from "../../../domain/models/feature";

export const accessProfileSchema = new EntitySchema<
AccessProfile & { features: Feature }
>({
  target: AccessProfile,
  name: "access_profiles",
  tableName: "access_profiles",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    admin: {
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
  relations: {
    features: {
      target: "features",
      type: "many-to-many",
      joinTable: {
        name: "access_profiles_features",
        joinColumn: { name: "access_profile_id", referencedColumnName: "id" },
        inverseJoinColumn: {
          name: "feature_id",
          referencedColumnName: "id",
        },
      },
    },
  },
});
