import { EntitySchema } from "typeorm";
import { Product } from "../../../domain/models/product";

export const productSchema = new EntitySchema<Product>({
  target: Product,
  name: "products",
  tableName: "products",
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
    description: {
      type: String,
      nullable: false,
    },
    price: {
      type: Number,
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
