import { EntitySchema } from "typeorm";
import { AccessProfile } from "../../../domain/models/accessProfile";
import { User, UserStatusEnum } from "../../../domain/models/user";

export const userSchema = new EntitySchema
<
User & { accessProfiles: AccessProfile }
>({
  target: User,
  name: "users",
  tableName: "users",
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
    email: {
      type: String,
      unique: true,
      nullable: false,
    },
    password: {
      type: String,
    },
    status: {
      type: "enum",
      enum: UserStatusEnum,
      nullable: false,
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      name: "phone_number",
      type: String,
    },
    createdAt: {
      name: "created_at",
      type: Date,
    },
    updatedAt: {
      name: "updated_at",
      type: Date,
    },
    deletedAt: {
      name: "deleted_at",
      type: Date,
    },
    confirmedAt: {
      name: "confirmed_at",
      type: Date,
    },
  },
  relations: {
    accessProfiles: {
      target: "access_profiles",
      type: "many-to-many",
      joinTable: {
        name: "user_access_profiles",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: {
          name: "access_profile_id",
          referencedColumnName: "id",
        },
      },
    },
  },
});
