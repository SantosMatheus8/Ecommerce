import { EntitySchema } from "typeorm";
import { User, UserStatusEnum } from "../../../domain/models/user";

export const userSchema = new EntitySchema<User>({
  target: User,
  name: "users",
  tableName: "users",
  columns: {
    id: {
      type: String,
      primary: true,
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
});
