import { EntitySchema } from "typeorm";
import { Order } from "../../../domain/models/order";
import { User } from "../../../domain/models/user";
import { Product } from "../../../domain/models/product";

export const orderSchema = new EntitySchema<Order & { user: User, products: Product }>({
  target: Order,
  name: "orders",
  tableName: "orders",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    totalValue: {
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
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
      },
    },
    products: {
      target: "products",
      type: "many-to-many",
      joinTable: {
        name: "orders_products",
        joinColumn: { name: "order_id", referencedColumnName: "id" },
        inverseJoinColumn: {
          name: "product_id",
          referencedColumnName: "id",
        },
      },
    },
  },
});
